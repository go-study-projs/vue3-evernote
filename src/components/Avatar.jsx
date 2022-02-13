import {defineComponent,computed} from 'vue'
import {useStore} from 'vuex'
import style from '@/assets/css-module/avatar.module.css'

export const Avatar = defineComponent(()=>{
    const store = useStore()
    const username = computed(() => store.getters.username)
    const slug = computed(() => store.getters.slug)
    return ()=>(
      <span className={style.avatar} title={username.value}>{slug.value}</span>
    )
})
