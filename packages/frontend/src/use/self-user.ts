import { User } from "@/types/user";
import { reactive, UnwrapRef, watch } from "vue";

const selfUser:UnwrapRef<User> = reactive({
    authenticated: false ,
    token: ""
})

selfUser.token = localStorage["TOKEN"]

watch(() => selfUser.token, (newToken) => {
    localStorage["TOKEN"] = newToken
})

export function useSelfUser() {
    return {
        user: selfUser
    }
}