/* ============
 * Auth State
 * ============
 *
 * The state of the authentication module.
 */

import { LocalStorage } from 'quasar'

export default {
  authenticated: false,
  token: LocalStorage.getItem('access_token'),
  user: null
}
