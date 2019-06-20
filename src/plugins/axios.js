/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios'
import Vue from 'vue'
import store from 'src/store'

Axios.defaults.baseURL = process.env.API_LOCATION
Axios.defaults.headers.common.Accept = 'application/json'

// Request interceptor
Axios.interceptors.request.use(request => {
  // const locale = store.getters['lang/locale']

  // if (locale) {
  request.headers.common['Accept-Language'] = 'en'
  // }

  // request.headers['X-Socket-Id'] = Echo.socketId()

  return request
})

// Response interceptor
Axios.interceptors.response.use((response) => response, (error) => {
  const { status } = error.response
  if (status >= 500) {
    //
  }

  if (status === 401 && store.getters['auth/check']) {
    //
  }

  return Promise.reject(error)
})

// Bind Axios to Vue.
Vue.$http = Axios
Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return Axios
  }
})
