import Auth from '@/apis/auth'
import router from '@/router'

const state = {
  user: null
}

const getters = {
  username: state => (state.user == null ? '未登录' : state.user.username),
  slug: state => (state.user == null ? '未' : state.user.username.charAt(0))
}

const mutations = {
  setUser(state, { user }) {
    state.user = user
  }
}

const actions = {
  login({ commit }, { username, password }) {
    return Auth.login({ username, password }).then(res => {
      localStorage.setItem('auth-token', res.data.token)
      commit('setUser', { user: res.data })
    })
  },

  register({ commit }, { username, password }) {
    return Auth.register({ username, password }).then(res => {
      localStorage.setItem('auth-token', res.data.token)
      commit('setUser', { user: res.data })
    })
  },

  logout({ commit }, payload = { path: '/login' }) {
    commit('setUser', { user: null })
    localStorage.setItem('auth-token', '')
    router.push(payload)
  }

  // checkLogin({ commit, state }) {
  //     if (state.user !== null) {
  //         Promise.resolve()
  //     }

  //     return Auth.getInfo()
  //         .then(res => {
  //             if (!res.isLogin) {
  //                 router.push({ path: '/login' })
  //             } else {
  //                 commit('setUser', { user: res.data })
  //             }
  //         })
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
