import shortid from 'shortid'

export const state = () => ({
  notifications: [],
})

export const ADD_NOTIFICATION = `ADD_NOTIFICATION`
export const REMOVE_NOTIFICATION = `REMOVE_NOTIFICATION`

export const mutations = {
  [ADD_NOTIFICATION](state, payload) {
    payload.id = payload.id || shortid.generate()
    state.notifications.push(payload)
  },
  [REMOVE_NOTIFICATION](state, id) {
    const notificationIndex = state.notifications.findIndex(
      notification => notification.id === id,
    )
    state.notifications.splice(notificationIndex, 1)
  },
}

export const actions = {
  nuxtServerInit({ commit }, nuxtCtx) {
    const { req } = nuxtCtx
    const { serverData } = req
    if (!serverData) return
    if (serverData.notification) {
      commit(ADD_NOTIFICATION, serverData.notification)
    }
  },
}
