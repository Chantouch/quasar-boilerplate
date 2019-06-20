import Proxy from './BaseProxy'

class AuthProxy extends Proxy {
  /**
   * The constructor for the AuthProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('auth', parameters)
  }

  /**
   * Method used to login.
   *
   * @param {String} email The email.
   * @param {String} password The password.
   *
   * @param rememberMe The remember me
   * @returns {Promise} The result in a promise.
   */
  login ({ email, password, rememberMe }) {
    const data = {
      email,
      password,
      rememberMe
    }
    return this.submit('post', `${this.endpoint}/login`, data)
  }
}

export default AuthProxy
