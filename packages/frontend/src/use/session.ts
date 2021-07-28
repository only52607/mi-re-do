import { reactive } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { Event, Friend, Group, Member, MiraiApi } from "mirai-reactivity-ws";

export interface ContactForSessionType {
    group: Group
    friend: Friend
    temp: Member
}

export type SessionType = keyof ContactForSessionType

export type SessionIdentity<T extends SessionType = SessionType> = [number, T]

export function sessionIdentityEquals(a: SessionIdentity, b: SessionIdentity) {
    return a[0] == b[0] && a[1] == b[1]
}

export interface SessionMetaBase<T extends SessionType> {
    identity: SessionIdentity<T>
    type: T
    contact: ContactForSessionType[T]
}

export interface FriendSessionMeta extends SessionMetaBase<"friend"> {
    identity: SessionIdentity<"friend">
    type: "friend"
    contact: ContactForSessionType["friend"]
}

export interface GroupSessionMeta extends SessionMetaBase<"group"> {
    identity: SessionIdentity<"group">
    type: "group"
    contact: ContactForSessionType["group"]
}

export interface TempSessionMeta extends SessionMetaBase<"temp"> {
    identity: SessionIdentity<"temp">
    type: "temp"
    contact: ContactForSessionType["temp"]
}

export type SessionMeta = FriendSessionMeta | GroupSessionMeta | TempSessionMeta

export interface SessionBase<T extends SessionType> extends SessionMetaBase<T> {
    unreadCount: number
    events: Event[]
}

export interface FriendSession extends SessionMetaBase<"friend"> {
    unreadCount: number
    events: Event[]
}

export interface GroupSession extends SessionMetaBase<"group"> {
    unreadCount: number
    events: Event[]
}

export interface TempSession extends SessionMetaBase<"temp"> {
    unreadCount: number
    events: Event[]
}

export type Session = FriendSession | GroupSession | TempSession

export type SessionList = Session[]

const sessionStoreKey = "EventBoxStore"

const globalSessionList = reactive([] as SessionList)

export function useSessionList(): SessionList {
    return globalSessionList as SessionList
}

Object.assign(globalSessionList, JSON.parse(localStorage.getItem(sessionStoreKey) ?? "[]"))

watchEffect(() => {
    localStorage.setItem(sessionStoreKey, JSON.stringify(globalSessionList))
})

function getSessionMeta(event: Event): SessionMeta | undefined {
    if (event.type == "FriendMessage") {
        return {
            identity: [event.sender.id, "friend"],
            type: "friend",
            contact: event.sender
        }
    }
    if (event.type == "GroupMessage") {
        return {
            identity: [event.sender.group.id, "group"],
            type: "group",
            contact: event.sender.group
        }
    }
    if (event.type == "TempMessage") {
        return {
            identity: [event.sender.id, "temp"],
            type: "temp",
            contact: event.sender
        }
    }
}

function eventDispatcher(event: Event) {
    const sessionMeta = getSessionMeta(event)
    if (!sessionMeta) return
    const eventBox = globalSessionList.find((box) => sessionIdentityEquals(box.identity, sessionMeta.identity))
    if (!eventBox) {
        globalSessionList.push({
            ...sessionMeta,
            events: [event],
            unreadCount: 1,
        })
        return 
    }
    eventBox.events.push(event)
    eventBox.unreadCount++
}

/**
 * 注册事件分发器
 */
let registered = false

export function registerEventDispatcher(miraiApi: MiraiApi) {
    if (!registered) {  // 防止重复注册
        miraiApi.addMiraiEventListener(eventDispatcher)
        registered = true
    }
}