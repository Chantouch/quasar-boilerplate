/* ============
 * User Transformer
 * ============
 *
 * The transformer for a user.
 */

import Transformer from './BaseTransformer'
import User from 'src/models/User'

class UserTransformer extends Transformer {
  /**
   * Method used to transform a fetched user.
   *
   * @returns {User} A user model.
   */
  static fetch (user) {
    return new User({
      id: user.id,
      displayName: user.display_name,
      name: user.name,
      email: user.email,
      createdAtReadable: user.created_at_readable
    })
  }

  /**
   * Method used to transform a send user.
   *
   * @returns {Object} The transformed user.
   */
  static send (user) {
    return {
      id: user.id,
      display_name: user.displayName,
      name: user.name,
      email: user.email
    }
  }
}

export default UserTransformer
