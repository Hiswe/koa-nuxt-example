import shortid from 'shortid'

export const state = () => ({
  notifications: [],
  connected: false,
})

export const ADD_NOTIFICATION = `ADD_NOTIFICATION`
export const REMOVE_NOTIFICATION = `REMOVE_NOTIFICATION`
export const USER_LOGIN = `USER_LOGIN`
export const USER_LOGOUT = `USER_LOGOUT`

export const LOGIN = `LOGIN`
export const LOGOUT = `LOGOUT`

export const mutations = {
  [ADD_NOTIFICATION](state, payload) {
    payload.id = payload.id || shortid.generate()
    payload.type = payload.type || `info`
    state.notifications.push(payload)
  },
  [REMOVE_NOTIFICATION](state, id) {
    const notificationIndex = state.notifications.findIndex(
      notification => notification.id === id,
    )
    state.notifications.splice(notificationIndex, 1)
  },
  [USER_LOGIN](state) {
    state.connected = true
  },
  [USER_LOGOUT](state) {
    state.connected = false
  },
}

export const actions = {
  // this is specific to Nuxt
  // https://nuxtjs.org/guide/vuex-store#the-nuxtserverinit-action
  nuxtServerInit({ commit }, nuxtCtx) {
    const { req } = nuxtCtx
    const { serverData } = req

    if (!serverData) return
    if (serverData.notification) {
      commit(ADD_NOTIFICATION, serverData.notification)
    }
    if (serverData.connected) {
      commit(USER_LOGIN)
    }
  },
  [LOGIN]({ commit }) {
    this.$axios
      .post(`/login`, {})
      .then(response => {
        commit(USER_LOGIN)
        commit(ADD_NOTIFICATION, {
          message: `connected`,
        })
      })
      .catch(error => {
        console.log(error)
        commit(ADD_NOTIFICATION, {
          message: `error while connecting`,
          type: `error`,
        })
      })
  },
  [LOGOUT]({ commit }) {
    this.$axios
      .post(`/logout`, {})
      .then(response => {
        commit(USER_LOGOUT)
        commit(ADD_NOTIFICATION, {
          message: `disconnected`,
        })
      })
      .catch(error => {
        console.log(error)
        commit(ADD_NOTIFICATION, {
          message: `error while disconnecting`,
          type: `error`,
        })
      })
  },
}
