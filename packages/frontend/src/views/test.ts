import { computed, ref, Ref } from "vue";
import { useFriendProfile } from "mirai-reactivity-ws";
function a (x: number | Ref<number>){

}

declare const RefSymbol: unique symbol

const b: Ref<number> = ref(1)
const c = computed(()=>1)
interface myref {
    value: number
    [RefSymbol]: true
}

function useMe(target: number | Ref<number>) {

}

useMe(c);