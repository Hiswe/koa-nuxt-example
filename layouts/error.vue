<script>
export default {
  name: `error`,
  props: [`error`],
  layout: `error-layout`,
}
</script>

<template>
  <section class="error">
    <div class="error__wrapper">
      <h1 class="error__title">{{error.statusCode}}</h1>
      <h2  class="error__message" v-if="error.statusCode === 404">not found</h2>
      <h2 class="error__message">{{error.message}}</h2>
      <router-link to="/">home</router-link>
    </div>
  </section>
</template>

<style>
.error {
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: var(--color-vue-light);
  padding: 1rem;
}
.error__wrapper {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
}
.error__title {
  font-size: 3rem;
  margin: 0;
  color: var(--color-vue);
}
</style>
