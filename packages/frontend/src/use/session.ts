import { useStorage } from "@vueuse/core";
import { Event, Friend, Group, Member, MiraiApi, useMiraiApi } from "mirai-reactivity-ws";
import { Ref, watch } from "vue";

/**
 * Session: 用于表示一个独立的会话，消息列表中的一个条目即为一个Session。
 */

/**
 * Session的类型，分别是群消息，好友消息和临时消息
 */
export type SessionType = "group" | "friend" | "temp";

/**
 * Session中的目标Contact对象，如群消息对应的Contact为此群对象
 */
export type ContactForSessionType<T extends SessionType> = T extends "group"
  ? Group
  : T extends "friend"
  ? Friend
  : Member;

/**
 * Session的标识，用于标识一组会话。由ID和SessionType组成，ID可以是群号、好友ID等
 */
export type SessionIdentity<T extends SessionType = SessionType> = [number, T];

export function sessionIdentityEquals<T extends SessionType = SessionType>(
  a: SessionIdentity<T>,
  b: SessionIdentity<T>
) {
  return a[0] == b[0] && a[1] == b[1];
}

export interface SessionMetaBase<T extends SessionType> {
  identity: SessionIdentity<T>;
  type: T;
  contact: ContactForSessionType<T>;
}

export interface FriendSessionMeta extends SessionMetaBase<"friend"> {
  identity: SessionIdentity<"friend">;
  type: "friend";
  contact: ContactForSessionType<"friend">;
}

export interface GroupSessionMeta extends SessionMetaBase<"group"> {
  identity: SessionIdentity<"group">;
  type: "group";
  contact: ContactForSessionType<"group">;
}

export interface TempSessionMeta extends SessionMetaBase<"temp"> {
  identity: SessionIdentity<"temp">;
  type: "temp";
  contact: ContactForSessionType<"temp">;
}

export type SessionMeta =
  | FriendSessionMeta
  | GroupSessionMeta
  | TempSessionMeta;

export interface SessionBase<T extends SessionType> extends SessionMetaBase<T> {
  unreadCount: number;
  events: Event[];
}

export interface FriendSession extends SessionMetaBase<"friend"> {
  unreadCount: number;
  events: Event[];
}

export interface GroupSession extends SessionMetaBase<"group"> {
  unreadCount: number;
  events: Event[];
}

export interface TempSession extends SessionMetaBase<"temp"> {
  unreadCount: number;
  events: Event[];
}

export type Session = FriendSession | GroupSession | TempSession;

export type SessionList = Session[];

const sessionStoreKey = "chat-sessions";

const globalSessionList = useStorage(sessionStoreKey, [] as SessionList)

export function useSessionList(): Ref<SessionList> {
  return globalSessionList;
}

export function pushEmptySession<T extends SessionType>(
  type: T,
  contact: ContactForSessionType<T>
) {
  if (
    globalSessionList.value.find(
      (session) =>
        session.identity[0] == contact.id && session.identity[1] == type
    )
  )
    return;
  globalSessionList.value.push({
    type: type as any,
    contact: contact as any,
    identity: [contact.id, type] as any,
    unreadCount: 0,
    events: [],
  });
}

export function sessionIdentityAsString(identity: SessionIdentity) {
  return `${identity[0]} ${identity[1]}`;
}

export function stringAsSessionIdentity(
  identityString: String
): SessionIdentity {
  const parts = identityString.split(" ");
  return [parseInt(parts[0]), parts[1] as SessionType];
}

function getSessionMeta(event: Event): SessionMeta | undefined {
  switch (event.type) {
    case "FriendMessage":
      return {
        identity: [event.sender.id, "friend"],
        type: "friend",
        contact: event.sender,
      };
    case "GroupMessage":
      return {
        identity: [event.sender.group.id, "group"],
        type: "group",
        contact: event.sender.group,
      };
    case "TempMessage":
      return {
        identity: [event.sender.id, "temp"],
        type: "temp",
        contact: event.sender,
      };
    case "SentMessage":
      return {
        identity: [event.target.id, event.targetType as any],
        type: event.targetType as any,
        contact: event.target as any,
      };
  }
  return undefined;
}

function eventDispatcher(event: Event) {
  const sessionMeta = getSessionMeta(event);
  if (!sessionMeta) return;
  const session = globalSessionList.value.find((box) =>
    sessionIdentityEquals(box.identity, sessionMeta.identity)
  );
  if (!session) {
    globalSessionList.value.push({
      ...sessionMeta,
      events: [event],
      unreadCount: 1,
    });
    return;
  }
  session.events.push(event);
  if (event.type != "SentMessage") session.unreadCount++;
}

/**
 * 注册事件分发器
 */
let registered = false;

const miraiApi = useMiraiApi()

export function registerEventDispatcherForSession(onSuccess: () => void) {
  function registerScheduler() {
    if (!miraiApi.value || registered) return
    miraiApi.value.addMiraiEventListener(eventDispatcher);
    registered = true;
    onSuccess()
  }
  watch(() => miraiApi.value != undefined, registerScheduler)
  registerScheduler()
}