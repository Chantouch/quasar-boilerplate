<template>
  <q-page>
    <div class="q-pa-md">
      <q-list>
        <q-pull-to-refresh @refresh="refresh">
          <div v-for="(user, index) in user.all" :key="`user-${index}`" class="q-mb-sm">
            <q-item :key="index" clickable v-ripple>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png"/>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ user.name }}</q-item-label>
                <q-item-label caption lines="2"
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                  adipiscit elit.
                </q-item-label>
              </q-item-section>
              <q-item-section side middle>
                <q-item-label caption>{{ user.createdAtReadable }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced inset></q-separator>
          </div>
        </q-pull-to-refresh>
      </q-list>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="currentPage"
          color="purple"
          :max="user.pagination.totalPages"
          :maxPages="6"
          :boundary-numbers="true"
          :direction-links="true"
        >
        </q-pagination>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import debounce from 'lodash.debounce'

export default {
  name: 'users-index',
  middleware: ['auth'],
  scrollToTop: true,
  data: () => {
    return {
      query: null
    }
  },

  /**
     * The computed properties the page can use.
     */
  computed: {
    ...mapState(['user']),
    limit: {
      get () {
        return this.user.pagination.limit
      },
      set (limit) {
        this.setLimit(limit)
      }
    },
    currentPage: {
      get () {
        return this.user.pagination.currentPage
      },
      set (page) {
        this.setPage(page)
      }
    }
  },
  /**
     * The methods which the page can use.
     */
  methods: {
    /**
       * The method use track the table sort changed.
       */
    sortingChanged (ctx) {
      const vm = this
      vm.sortBy = ctx.sortBy
      vm.sortDesc = ctx.sortDesc
      vm.setQuery(vm.query)
    },
    /**
       * Method used to get the user route.
       *
       * @param {Number} uuid The user identifier.
       *
       * @returns {Object} The user route.
       */
    getEditRoute (uuid) {
      return {
        name: 'user.edit',
        params: { uuid: uuid }
      }
    },
    /**
       * Method used to get the user route.
       *
       * @param {Number} uuid The user identifier.
       *
       * @returns {Object} The user route.
       */
    getDetailRoute (uuid) {
      return {
        name: 'user.detail',
        params: { uuid: uuid }
      }
    },
    /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
    setPage (page) {
      this.$store.dispatch('user/all', proxy => {
        proxy.setParameter('page', page)
      })
    },
    /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
    setLimit (limit) {
      this.$store.dispatch('user/all', proxy => {
        proxy.setParameter('limit', limit).removeParameter('page')
      })
    },
    /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
    setQuery: debounce(function (query) {
      const vm = this
      vm.$store.dispatch('user/all', proxy => {
        proxy.setParameters({ q: query }).removeParameter('page')
      })
    }, 500),
    /**
       * Reload the resource
       */
    reloadResource: debounce(function () {
      this.$store.dispatch('user/all', proxy => {
        proxy.removeParameters(['page', 'q', 'direction', 'sort'])
      })
    }, 500),
    refresh (done) {
      this.$store.dispatch('user/all', proxy => {
        proxy.removeParameters(['page', 'q', 'direction', 'sort', 'search'])
      })
      done()
    },
    /**
       * Delete the resource
       */
    destroy (uuid) {
      const vm = this
      vm.$swal
        .fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then(result => {
          if (result.value) {
            vm.$store.dispatch('user/destroy', uuid)
          }
        })
    }
  },
  /**
     * This method will be fired once the application has been mounted.
     */
  async mounted () {
    const vm = this
    await vm.$store.watch(state => {
      if (state.auth.authenticated) {
        vm.$store.dispatch('user/all', proxy => {
          proxy.removeParameters(['page', 'q', 'direction', 'sort'])
        })
      }
    })
  },
  /**
     * Available watchers for this page.
     */
  watch: {
    query (query) {
      this.setQuery(query)
    }
  }
}
</script>
