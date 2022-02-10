import Notebooks from '@/apis/notebooks'
import { ElMessage } from 'element-plus'

const state = {
  notebooks: null,
  currentNotebookId: null
}

const getters = {
  notebooks: state => state.notebooks || [],
  currentNotebook: state => {
    const { currentNotebookId } = state

    if (!Array.isArray(state.notebooks)) {
      return {}
    }

    if (!currentNotebookId) {
      return state.notebooks[0] || {}
    }

    return state.notebooks.find(notebook => notebook.id === currentNotebookId)
  }
}

const mutations = {
  setNotebooks(state, { notebooks }) {
    state.notebooks = notebooks
  },

  addNotebook(state, { notebook }) {
    state.notebooks.unshift(notebook)
  },

  updateNotebook(state, { notebookId, title }) {
    const notebook =
      state.notebooks.find(notebook => notebook.id === notebookId) || {}
    notebook.title = title
  },

  deleteNotebook(state, { notebookId }) {
    state.notebooks = state.notebooks.filter(
      notebook => notebook.id !== notebookId
    )
  },

  setCurrentBookId(state, { currentNotebookId }) {
    state.currentNotebookId = currentNotebookId
  }
}

const actions = {
  getNotebooks({ commit, state }) {
    return Notebooks.getAll().then(res => {
      commit('setNotebooks', { notebooks: res.data })
    })
  },

  addNotebook({ commit }, { title }) {
    return Notebooks.addNotebook({ title }).then(res => {
      commit('addNotebook', { notebook: res.data })
      ElMessage.success(res.msg)
    })
  },

  updateNotebook({ commit }, { notebookId, title }) {
    return Notebooks.updateNotebook(notebookId, { title }).then(res => {
      commit('updateNotebook', { notebookId, title })
      ElMessage.success(res.msg)
    })
  },

  deleteNotebook({ commit }, { notebookId }) {
    return Notebooks.deleteNotebook(notebookId).then(res => {
      commit('deleteNotebook', { notebookId })
      ElMessage.success(res.msg)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
