import { reactive } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { Event, Friend, Group, Member, MiraiApi } from "mirai-reactivity-ws";

export type SessionType = "group" | "friend" | "temp";

export type ContactForSessionType<T extends SessionType> = T extends "group"
  ? Group
  : T extends "friend"
  ? Friend
  : Member;

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

const sessionStoreKey = "EventBoxStore";

const globalSessionList = reactive([] as SessionList);

export function useSessionList(): SessionList {
  return globalSessionList as SessionList;
}

Object.assign(
  globalSessionList,
  JSON.parse(localStorage.getItem(sessionStoreKey) ?? "[]")
);

watchEffect(() => {
  localStorage.setItem(sessionStoreKey, JSON.stringify(globalSessionList));
});

export function pushEmptySession<T extends SessionType>(
  type: T,
  contact: ContactForSessionType<T>
) {
  if (
    globalSessionList.find(
      (session) =>
        session.identity[0] == contact.id && session.identity[1] == type
    )
  )
    return;
  globalSessionList.push({
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
  const session = globalSessionList.find((box) =>
    sessionIdentityEquals(box.identity, sessionMeta.identity)
  );
  if (!session) {
    globalSessionList.push({
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

export function registerEventDispatcher(miraiApi: MiraiApi) {
  if (!registered) {
    // 防止重复注册
    miraiApi.addMiraiEventListener(eventDispatcher);
    registered = true;
  }
}
