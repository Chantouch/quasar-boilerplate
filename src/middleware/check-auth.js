import store from 'src/store'

export default async (to, from, next) => {
  store.dispatch('auth/check')
  if (!store.state.auth.authenticated && store.state.auth.token) {
    try {
      await store.dispatch('auth/fetchUser')
    } catch (e) {
      next(e)
    }
  }

  next()
}
