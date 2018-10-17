<script>
export default {
  name: `kn-navigation`,
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
.kn-navigation__link.nuxt-link-exact-active {
  color: var(--color-vue);
  pointer-events: none;
}
</style>
