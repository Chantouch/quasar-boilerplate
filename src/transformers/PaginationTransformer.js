/* ============
 * Pagination Transformer
 * ============
 *
 * The transformer for the pagination.
 */

import Transformer from './BaseTransformer'
import Pagination from 'src/models/Pagination'

class PaginationTransformer extends Transformer {
  /**
   * Method used to transform the fetched pagination.
   *
   * @param {Object} pagination The fetched pagination.
   *
   * @returns {Object} The transformed pagination.
   */
  static fetch (pagination) {
    return new Pagination({
      total: pagination.total,
      count: pagination.count,
      totalPages: pagination.total_pages,
      currentPage: pagination.current_page,
      limit: pagination.per_page
    })
  }
}

export default PaginationTransformer
