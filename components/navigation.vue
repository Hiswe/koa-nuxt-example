<script>
import { mapState, mapActions } from 'vuex'

import { LOGIN, LOGOUT } from '~/store'

export default {
  name: `kn-navigation`,
  computed: {
    ...mapState([`connected`]),
  },
  methods: {
    ...mapActions({ login: LOGIN, logout: LOGOUT }),
  },
}
</script>

<template>
  <nav class="kn-navigation">
    <nuxt-link class="kn-navigation__link" to="/">
      home
    </nuxt-link>
    <nuxt-link class="kn-navigation__link" to="/test">
      test
    </nuxt-link>
    <form
      v-if="connected"
      action="/logout"
      method="POST"
      class="kn-navigation__link"
      @submit.prevent="logout"
    >
      <button type="submit">logout</button>
    </form>
    <form
      v-else
      action="/login"
      method="POST"
      class="kn-navigation__link"
      @submit.prevent="login"
    >
      <button type="submit">login</button>
    </form>
  </nav>
</template>

<style scoped>
.kn-navigation {
  height: 50px;
  border-bottom: 1px solid grey;
  display: flex;
}
.kn-navigation__link {
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
  text-decoration: none;
}
.kn-navigation__link button {
  border: 0;
  background: none;
}
.kn-navigation__link.nuxt-link-exact-active {
  color: var(--color-vue);
  pointer-events: none;
}
</style>
