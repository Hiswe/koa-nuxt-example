<script>
import KnNotifications from '~/components/notifications.vue'

export default {
  name: `layout-default`,
  components: {
    KnNotifications,
  },
}
</script>

<template>
  <kn-main>
    <kn-navigation />
    <nuxt />
    <kn-notifications />
  </kn-main>
</template>

<style scoped>
.no-script-message {
  text-align: center;
  margin: 0 0 1rem;
  padding: 1rem;
  background: var(--color-vue-light);
}
</style>
