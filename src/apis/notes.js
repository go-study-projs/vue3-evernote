import request from '@/helpers/request'

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
}

export default {
  addNote(
    { notebookId },
    { title = '', content = '' } = { title: '', content: '' }
  ) {
    return request(URL.ADD.replace(':notebookId', notebookId), 'POST', {
      title,
      content
    })
  },

  deleteNote({ noteId }) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  },

  updateNote({ noteId }, { title, content }) {
    return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', {
      title,
      content
    })
  },

  getAll({ notebookId }) {
    return new Promise((resolve, reject) => {
      request(URL.GET.replace(':notebookId', notebookId))
        .then(res => {
          res.data = res.data.sort(
            (note1, note2) => note1.createdAt < note2.createdAt
          )
          resolve(res)
        })
        .catch(res => {
          reject(res)
        })
    })
  }
}
