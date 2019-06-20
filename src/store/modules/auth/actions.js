/* ============
 * Auth Actions
 * ============
 *
 * The actions available for the auth module.
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from 'src/store'
import Proxy from 'src/proxies/AuthProxy'
import AuthTransformer from 'src/transformers/AuthTransformer'
import { Notify } from 'quasar'

const proxy = new Proxy()

/**
 * Action which will check the authentication.
 *
 * @param {function} commit Commit function to update the store.
 */
export const check = async ({ commit }) => {
  commit(types.CHECK)
}

/**
 * Action which will try to login the user.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   payload The payload.
 */
export const login = ({ commit }, payload) => {
  proxy
    .login(payload)
    .then(response => {
      commit(types.LOGIN, AuthTransformer.fetch(response.data))

      Notify.create({
        message: 'Logged in successful'
      })
      Vue.router.push({
        name: 'Dashboard'
      })
    })
    .catch((error) => {
      Notify.create({
        message: error.message
      })
    })
}

/**
 * Action which will try to logout the user.
 *
 * @param {function} commit Commit function to update the store.
 */
export const logout = async ({ commit }) => {
  commit(types.LOGOUT)

  store.dispatch('application/addAlert', {
    type: 'success',
    message: 'Logout successful!'
  })

  Vue.router.push({
    name: 'Login'
  })
}
/**
 * Action which fire when save user token to local storage
 * @param commit
 * @param payload
 * @returns {Promise<void>}
 */
export const saveToken = async ({ commit }, payload) => {
  commit(types.SAVE_TOKEN, payload)
}

/**
 * Action will fire when fetch user logged in
 * @param commit
 * @returns {Promise<void>}
 */
export const fetchUser = async ({ commit }) => {
  try {
    const { data } = await Vue.$http.get('/user')
    commit(types.FETCH_USER_SUCCESS, { user: data })
  } catch (e) {
    // commit(types.FETCH_USER_FAILURE)
  }
}

export default {
  check,
  login,
  logout,
  saveToken,
  fetchUser
}
