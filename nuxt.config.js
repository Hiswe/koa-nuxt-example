import pkg from '../package.json'

export default {
  router: {
    middleware: [`handle-server-errors`],
  },
  modules: [`@nuxtjs/axios`],
  plugins: [`@/plugins/register-global-components.js`],
  css: [`@/assets/global-style.css`],
  build: {},
  axios: {},
  head: {
    title: `💚`,
    titleTemplate: `Koa Nuxt – %s`,
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { 'http-equiv': `X-UA-Compatible`, content: `IE=edge` },
      { hid: `author`, name: `author`, content: pkg.author },
      { hid: `description`, name: `description`, content: pkg.description },
    ],
    noscript: [
      {
        innerHTML: `
        <p class="no-script-message">
          Javascript is disabled but no worries everything should be fine
        </p>`,
      },
    ],
    __dangerouslyDisableSanitizers: ['noscript'],
  },
}
