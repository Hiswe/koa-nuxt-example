import Koa from 'koa'
import Router from 'koa-router'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
import util from 'util'
import Boom from 'Boom'
import shortid from 'shortid'
import logger from 'koa-logger'
import session from 'koa-session'

import nuxtConfig from '../nuxt.config.js'
import koaNuxt from '../../dist'

consola.level = 100

const appLogger = consola.withScope(`APP`)
const errorLogger = consola.withScope(`ERROR`)

const app = new Koa()
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000

// for signed cookies
app.keys = [
  `e05fa6f6e4c078ad997ec324e6d69f59829b2e2237c5e1d9e3610fea291793f4`,
  `64241b9838c5d0d5f94f7e83c71d83af4674f8c84e406a138263a8803a3b1e6f`,
]

nuxtConfig.dev = !(app.env === 'production')

async function start() {
  //////
  // SERVER CONFIG
  //////

  app.use(logger())

  const SESSIONS_CONFIG = {
    key: `kn-example`,
    // don't autoCommit
    // • it will be done after Nuxt render
    // … but Nuxt will already have send the response
    // … so session won't be modified
    // • https://github.com/koajs/session/issues/89
    autoCommit: false,
  }
  app.use(session(SESSIONS_CONFIG, app))

  //----- NUXT HANDLING

  const nuxt = new Nuxt(nuxtConfig)

  // Build in development
  if (nuxtConfig.dev) {
    appLogger.info(`SPA build for dev`)
    const builder = new Builder(nuxt)
    await builder.build()
  }

  const renderNuxt = koaNuxt(nuxt)

  //----- XHR GUESSING

  app.use(async (ctx, next) => {
    ctx.state.isJson = ctx.request.type === `application/json`
    await next()
  })

  //----- ERROR HANDLING

  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      errorLogger.error(`one of the next middleware has errored`)
      console.log(util.inspect(error, { colors: true }))
      const boomError = Boom.boomify(error, {
        statusCode: 500,
        message: `something really bad happened`,
        override: false,
      })
      ctx.status = boomError.output.statusCode
      // handle XHR
      if (ctx.state.isJson) return (ctx.body = boomError)
      // expose error to nuxt
      // • used by middleware/handle-server-errors
      ctx.req.error = boomError
      try {
        errorLogger.error(`serving nuxt response`)
        // still call nuxt middleware
        await renderNuxt(ctx)
      } catch (nuxtError) {
        // we want to make that ANY errors will be catch here
        errorLogger.error(`serving nuxt response failed`)
        console.log(util.inspect(nuxtError, { colors: true }))
        ctx.body = `nuxt error`
      }
    }
  })

  //////
  // API ROUTING
  //////

  //----- API

  const router = new Router()

  router.post(`/flash-message`, async ctx => {
    const id = shortid.generate()
    const notification = {
      id,
      message: `my flash message ${id}`,
      type: `info`,
    }
    // handle XHR
    if (ctx.state.isJson) return (ctx.body = notification)
    // set the flash messages
    ctx.session = { notification }
    // persist session with `manuallyCommit`
    // • https://github.com/koajs/session#sessionmanuallycommit
    await ctx.session.manuallyCommit()
    ctx.redirect(`/test`)
  })
  router.post(`/will-throw`, async ctx => {
    throw Boom.teapot()
  })

  //----- MOUNT ROUTER TO APPLICATION

  app.use(router.routes())
  app.use(router.allowedMethods())

  //////
  // NUXT FALLBACK
  //////

  app.use(async (ctx, next) => {
    // useful for Vuex nuxtServerInit
    ctx.req.serverData = {
      ...ctx.session,
    }
    // remove flash message
    delete ctx.session.notification
    // persist session with `manuallyCommit`
    // • this prevent writing headers after Nuxt response
    // • https://github.com/koajs/session#sessionmanuallycommit
    await ctx.session.manuallyCommit()
    // can render with Nuxt
    await next()
  })

  app.use(renderNuxt)

  //////
  // LAUNCHING
  //////

  app.listen(PORT, HOST, function koaInitEnd() {
    appLogger.start(
      `server is listening at ${HOST}:${PORT}`,
      `on mode ${app.env}`,
    )
  })
}

start()
