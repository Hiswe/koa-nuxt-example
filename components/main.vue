<script>
export default {
  name: `kn-main`,
}
</script>

<template>
  <main role="main" class="kn-main">
    <slot />
  </main>
</template>

<style scoped>
.kn-main {
  min-height: 100vh;
}
</style>

