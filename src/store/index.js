import { createStore } from 'vuex'
import notebook from './modules/notebook'
import note from './modules/note'
import user from './modules/user'
import trash from './modules/trash'

export default createStore({
  modules: {
    notebook,
    note,
    user,
    trash
  }
})
