import filters from '@/helpers/filter'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'

import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMessage,
  ElMessageBox,
  ElButton
} from 'element-plus'

// 全局过滤器
/*
for (let key in filters) {
  Vue.filter(key, filters[key])
}
*/

const app = createApp(App)

app.use(ElementPlus)
app.use(ElButton)
app.use(ElDropdown)
app.use(ElDropdownMenu)
app.use(ElDropdownItem)

app.config.globalProperties.$elMessage = ElMessage
app.config.globalProperties.$confirm = ElMessageBox.confirm
app.config.globalProperties.$prompt = ElMessageBox.prompt

// 全局过滤器迁移 https://v3.cn.vuejs.org/guide/migration/filters.html#_3-x-%E6%9B%B4%E6%96%B0
app.config.globalProperties.$filters = filters

app.use(store).use(router).mount('#app')
