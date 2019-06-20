import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

const debug = process.env.DEV !== 'production'

// Load store modules dynamically.
const requireContext = require.context('src/store/modules/', true, /index\.js$/)

const modules = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
  )
  .reduce((modules, [name, module]) => {
    if (module.default.namespaced === undefined) {
      module.default.namespaced = true
    }
    return { ...modules, [name.replace('/index', '')]: module.default }
  }, {})

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  modules,
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: debug,
  /**
     * Plugins used in the store.
     */
  plugins: debug ? [createLogger()] : []
})
