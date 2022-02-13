import Note from '@/apis/notes'
import { ElMessage } from 'element-plus'

const state = {
  notes: null,
  currentNoteId: null
}

const getters = {
  notes: state => state.notes || [],
  currentNoteId: state => state.currentNoteId,
  currentNote: state => {
    const { currentNoteId } = state
    if (!Array.isArray(state.notes)) {
      return {}
    }

    if (!currentNoteId) {
      return state.notes[0] || {}
    }

    return state.notes.find(note => note.id === currentNoteId) || {}
  }
}

const mutations = {
  setNotes(state, { notes }) {
    state.notes = notes
  },

  addNote(state, { note }) {
    state.notes.unshift(note)
  },

  updateNote(state, { noteId, title, content }) {
    const note = state.notes.find(note => note.id === noteId) || {}
    note.title = title
    note.content = content
  },

  deleteNote(state, { noteId }) {
    state.notes = state.notes.filter(note => note.id !== noteId)
  },

  setCurrentNoteId(state, { currentNoteId } = {}) {
    state.currentNoteId = currentNoteId
  }
}

const actions = {
  getNotes({ commit }, { notebookId }) {
    return Note.getAll({ notebookId }).then(res => {
      commit('setNotes', { notes: res.data })
    })
  },

  addNote({ commit }, { notebookId, title, content }) {
    return Note.addNote({ notebookId }, { title, content }).then(res => {
      commit('addNote', { note: res.data })
      ElMessage.success(res.msg)
      return res.data.id
    })
  },

  updateNote({ commit }, { noteId, title, content }) {
    return Note.updateNote({ noteId }, { title, content }).then(res => {
      commit('updateNote', { noteId, title, content })
      // ElMessage.success(res.msg)
    })
  },

  deleteNote({ commit }, { noteId }) {
    return Note.deleteNote({ noteId }).then(res => {
      commit('deleteNote', { noteId })
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
