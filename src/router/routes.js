/**
 * Load dynamically the components
 * @param component
 * @returns {function(): Promise<any>}
 */
function load (component) {
  return () => import(`src/pages/${component}`).then(m => m.default || m)
}

const routes = [
  {
    path: '/',
    component: () => import('src/containers/MyContainer'),
    children: [
      { path: '/', component: load('Index'), name: 'Dashboard' },
      { path: '/users', component: load('users/index') }
    ]
  },
  {
    path: '/auth',
    redirect: '/pages/404',
    name: 'Auth',
    component: () => import('src/containers/BasicContainer'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: load('auth/login')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => load('Error404')
  })
}

export default routes
