// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../package.json":[function(require,module,exports) {
module.exports = {
  "name": "@hiswe/koa-next",
  "version": "0.0.1",
  "description": "koa middleware for nuxt",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": "https://github.com/Hiswe/koa-nuxt.git",
  "author": "Hiswe <hiswehalya@gmail.com>",
  "license": "MIT",
  "private": false,
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "del dist && rollup --config",
    "toc": "doctoc README.md --github"
  },
  "dependencies": {
    "@types/node": "^10.12.0"
  },
  "devDependencies": {
    "del-cli": "^1.1.0",
    "doctoc": "^1.3.1",
    "rollup": "^0.66.6",
    "rollup-plugin-typescript2": "^0.17.1",
    "ts-node": "^7.0.1",
    "typescript": "^3.1.3"
  }
};
},{}],"../nuxt.config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  router: {
    middleware: [`handle-server-errors`]
  },
  modules: [`@nuxtjs/axios`],
  plugins: [`@/plugins/register-global-components.js`],
  css: [`@/assets/global-style.css`],
  build: {},
  axios: {},
  head: {
    title: `💚`,
    titleTemplate: `Koa Nuxt – %s`,
    meta: [{
      charset: `utf-8`
    }, {
      name: `viewport`,
      content: `width=device-width, initial-scale=1`
    }, {
      'http-equiv': `X-UA-Compatible`,
      content: `IE=edge`
    }, {
      hid: `author`,
      name: `author`,
      content: _package.default.author
    }, {
      hid: `description`,
      name: `description`,
      content: _package.default.description
    }],
    noscript: [{
      innerHTML: `
        <p class="no-script-message">
          Javascript is disabled but no worries everything should be fine
        </p>`
    }],
    __dangerouslyDisableSanitizers: ['noscript']
  }
};
exports.default = _default;
},{"../package.json":"../../package.json"}],"../../dist/index.js":[function(require,module,exports) {
'use strict'; // follow create-nuxt-app example
// https://github.com/nuxt/create-nuxt-app/blob/master/template/server/index-koa.js

function createKoaMiddleware(nuxt) {
  return function renderNuxt(ctx) {
    // koa defaults to 404 when it sees that status is unset
    ctx.status = 200; // Mark request as handled for Koa

    ctx.respond = false;
    return new Promise(function (resolve, reject) {
      ctx.res.on('close', resolve);
      ctx.res.on('finish', resolve);
      nuxt.render(ctx.req, ctx.res, function nuxtRenderCallback(renderPromise) {
        // nuxt.render passes a rejected promise into callback on error.
        renderPromise.then(resolve)["catch"](reject);
      });
    });
  };
}

module.exports = createKoaMiddleware;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _consola = _interopRequireDefault(require("consola"));

var _nuxt = require("nuxt");

var _util = _interopRequireDefault(require("util"));

var _Boom = _interopRequireDefault(require("Boom"));

var _shortid = _interopRequireDefault(require("shortid"));

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _koaSession = _interopRequireDefault(require("koa-session"));

var _nuxtConfig = _interopRequireDefault(require("../nuxt.config.js"));

var _dist = _interopRequireDefault(require("../../dist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_consola.default.level = 100;

const appLogger = _consola.default.withScope(`APP`);

const errorLogger = _consola.default.withScope(`ERROR`);

const app = new _koa.default();
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000; // for signed cookies

app.keys = [`e05fa6f6e4c078ad997ec324e6d69f59829b2e2237c5e1d9e3610fea291793f4`, `64241b9838c5d0d5f94f7e83c71d83af4674f8c84e406a138263a8803a3b1e6f`];
_nuxtConfig.default.dev = !(app.env === 'production');

async function start() {
  //////
  // SERVER CONFIG
  //////
  app.use((0, _koaLogger.default)());
  const SESSIONS_CONFIG = {
    key: `kn-example`,
    // don't autoCommit
    // • it will be done after Nuxt render
    // … but Nuxt will already have send the response
    // … so session won't be modified
    // • https://github.com/koajs/session/issues/89
    autoCommit: false
  };
  app.use((0, _koaSession.default)(SESSIONS_CONFIG, app)); //----- NUXT HANDLING

  const nuxt = new _nuxt.Nuxt(_nuxtConfig.default); // Build in development

  if (_nuxtConfig.default.dev) {
    appLogger.info(`SPA build for dev`);
    const builder = new _nuxt.Builder(nuxt);
    await builder.build();
  }

  const renderNuxt = (0, _dist.default)(nuxt); //----- XHR GUESSING

  app.use(async (ctx, next) => {
    ctx.state.isJson = ctx.request.type === `application/json`;
    await next();
  }); //----- ERROR HANDLING

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      errorLogger.error(`one of the next middleware has errored`);
      console.log(_util.default.inspect(error, {
        colors: true
      }));

      const boomError = _Boom.default.boomify(error, {
        statusCode: 500,
        message: `something really bad happened`,
        override: false
      });

      ctx.status = boomError.output.statusCode;
      if (ctx.state.isJson) return ctx.body = boomError; // expose error to nuxt
      // • used by middleware/handle-server-errors

      ctx.req.error = boomError;

      try {
        errorLogger.error(`serving nuxt response`); // still call nuxt middleware

        await renderNuxt(ctx);
      } catch (nuxtError) {
        // we want to make that ANY errors will be catch here
        errorLogger.error(`serving nuxt response failed`);
        console.log(_util.default.inspect(nuxtError, {
          colors: true
        }));
        ctx.body = `nuxt error`;
      }
    }
  }); //////
  // API ROUTING
  //////
  //----- API

  const router = new _koaRouter.default();
  router.post(`/flash-message`, async ctx => {
    const id = _shortid.default.generate();

    const notification = {
      id,
      message: `my flash message ${id}`,
      type: `info`
    };
    if (ctx.state.isJson) return ctx.body = notification;
    ctx.session = {
      notification // persist session with `manuallyCommit`
      // • https://github.com/koajs/session#sessionmanuallycommit

    };
    await ctx.session.manuallyCommit();
    ctx.redirect(`/test`);
  });
  router.post(`/will-throw`, async ctx => {
    throw _Boom.default.teapot();
  }); //----- MOUNT ROUTER TO APPLICATION

  app.use(router.routes());
  app.use(router.allowedMethods()); //////
  // NUXT FALLBACK
  //////

  app.use(async (ctx, next) => {
    // useful for Vuex nuxtServerInit
    ctx.req.serverData = { ...ctx.session
    }; // remove flash message

    delete ctx.session.notification; // persist session with `manuallyCommit`
    // • this prevent writing headers after Nuxt response
    // • https://github.com/koajs/session#sessionmanuallycommit

    await ctx.session.manuallyCommit(); // can render with Nuxt

    await next();
  });
  app.use(renderNuxt); //////
  // LAUNCHING
  //////

  app.listen(PORT, HOST, function koaInitEnd() {
    appLogger.start(`server is listening at ${HOST}:${PORT}`, `on mode ${app.env}`);
  });
}

start();
},{"../nuxt.config.js":"../nuxt.config.js","../../dist":"../../dist/index.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.map