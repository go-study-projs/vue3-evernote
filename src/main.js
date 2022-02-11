import filters from '@/helpers/filter'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css';
import '@/assets/css/fix-element-bug.less'

import {
  ElButton,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElMessage,
  ElMessageBox
} from 'element-plus'


const app = createApp(App)

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
