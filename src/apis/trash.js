import request from '@/helpers/request'

const URL = {
  GET: '/notes/trash',
  REVERT: 'notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}
export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET)
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
  },

  deleteNote({ noteId }) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  },

  revertNote({ noteId }) {
    return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
  }
}
