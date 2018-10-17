<script>
import { mapMutations } from 'vuex'

import { ADD_NOTIFICATION } from '~/store'

export default {
  name: `page-test`,
  head: {
    title: `test`,
  },
  methods: {
    addNotification() {
      this.$axios
        .post(`/flash-message`, {})
        .then(response => {
          const { data } = response
          this.notify(data)
        })
        .catch(error => {
          this.notify({
            message: `cannot get a new flash message`,
            type: `error`,
          })
        })
    },
    addError() {
      this.$axios.post(`/will-throw`, {}).catch(error => {
        this.notify({
          message: error.response.statusText,
          type: `error`,
        })
      })
    },
    ...mapMutations({ notify: ADD_NOTIFICATION }),
  },
}
</script>

<template>
  <div class="test">
    <form
      action="/flash-message"
      method="POST"
      @submit.prevent="addNotification"
    >
      <button class="kn-button" type="submit">show a flash message</button>
    </form>
    <form
      action="/will-throw"
      method="POST"
      @submit.prevent="addError"
    >
      <button class="kn-button" type="submit">throw a server error</button>
    </form>
  </div>
</template>

<style scoped>
.test {
  text-align: center;
}
.kn-button {
  background: var(--color-vue);
  color: white;
  border: 0;
  padding: 0.75rem 1rem;
  margin-top: 2rem;
  border-radius: 0.25rem;
}
</style>
