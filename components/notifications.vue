<script>
import { mapState } from 'vuex'

import KnNotification from '~/components/notification-item'

export default {
  name: `kn-notifications`,
  components: { KnNotification },
  computed: {
    ...mapState([`notifications`]),
  },
}
</script>

<template>
  <aside class="kn-notifications">
    <kn-notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </aside>
</template>

<style scoped>
.kn-notifications {
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 500px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
}
</style>
