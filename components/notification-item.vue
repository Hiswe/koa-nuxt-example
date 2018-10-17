<script>
import { mapMutations } from 'vuex'
import { REMOVE_NOTIFICATION } from '~/store'

const REMOVE_DELAY = 6600

export default {
  name: `kn-notification`,
  data() {
    return {
      timerId: false,
    }
  },
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  // mounted instead of create for use only in client side
  mounted() {
    this.$el.style.setProperty(
      '--expanded',
      `${this.$refs.content.offsetHeight}px`,
    )
    this.timerId = window.setTimeout(
      () => this.removeNotification(),
      REMOVE_DELAY,
    )
  },
  methods: {
    removeNotification() {
      window.clearTimeout(this.timerId)
      this.timerId = false
      this.removeNotification(this.notification.id)
    },
    ...mapMutations({
      removeNotification: REMOVE_NOTIFICATION,
    }),
  },
}
</script>

<template>
  <transition name="kn-notification" appear>
    <div class="kn-notification" @click="removeNotification">
      <p
        ref="content"
        :class="`kn-notification__content kn-notification__content--${notification.type}`"
      >
        {{notification.message}}
      </p>
    </div>
  </transition>
</template>

<style scoped>
.kn-notification {
  transform-origin: bottom center;
  max-height: var(--expanded, 70px);
  min-height: var(--expanded, 70px);
  transition: all 0.5s;
}
.kn-notification__content {
  border: 1em solid rgba(0, 0, 0, 0.5);
  border-width: 1em 1em 0;
  background-color: greenyellow;
  background-clip: padding-box;
  padding: 1em;
  margin: 0;
  text-align: center;
}
.kn-notification__content--error {
  background-color: red;
  color: white;
}
.kn-notification-leave-to-active {
  transition: all 0.25s;
}
.kn-notification-enter,
.kn-notification-leave-to {
  opacity: 0;
  max-height: 0;
  min-height: 0;
}
</style>
