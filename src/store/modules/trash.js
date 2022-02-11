import Trash from '@/apis/trash'
import { ElMessage } from 'element-plus'

const state = {
  trashNotes: null,
  currentTrashNoteId: null
}

const getters = {
  trashNotes: state => state.trashNotes || [],

  currentTrashNote: (state, getters) => {
    const { currentTrashNoteId, trashNotes } = state

    if (!currentTrashNoteId) {
      return getters.trashNotes[0] || {}
    }

    return trashNotes.find(note => note.id === currentTrashNoteId) || {}
  },

  belongTo: (state, getters, rootState, rootGetters) => {
    const { currentTrashNote } = getters
    const notebook = rootGetters.notebooks.find(
      notebook => notebook.id === currentTrashNote.notebookId
    )

    return (notebook || {}).title || ''
  }
}

const mutations = {
  setTrashNotes(state, { trashNotes }) {
    state.trashNotes = trashNotes
  },

  addTrashNote(state, { note }) {
    state.trashNotes.unshift(note)
  },

  deleteTrashNote(state, { noteId }) {
    state.trashNotes = state.trashNotes.filter(note => note.id !== noteId)
  },

  setCurrentTrashNoteId(state, { currentTrashNoteId } = {}) {
    state.currentTrashNoteId = currentTrashNoteId
  }
}

const actions = {
  getTrashNotes({ commit }) {
    return Trash.getAll().then(res => {
      commit('setTrashNotes', { trashNotes: res.data })
    })
  },

  // addNote({ commit }, { notebookId, title, content }) {
  //     return Trash.addNote({ notebookId }, { title, content })
  //         .then(res => {
  //             commit('addNote', { note: res.data })
  //             Message.success(res.msg)
  //             return res.data.id
  //         })
  // },

  deleteTrashNote({ commit }, { noteId }) {
    return Trash.deleteNote({ noteId }).then(res => {
      commit('deleteTrashNote', { noteId })
      ElMessage.success(res.msg)
    })
  },

  revertTrashNote({ commit }, { noteId }) {
    return Trash.revertNote({ noteId }).then(res => {
      commit('deleteTrashNote', { noteId })
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
