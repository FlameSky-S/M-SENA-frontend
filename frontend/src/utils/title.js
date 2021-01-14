import router from '@/router'
import store from '@/store'

function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}-M-SENA-System`
  }
  return 'M-SENA-System'
}

router.beforeResolve(async (to, from, next) => {
  await store.dispatch('routes/setRoutes')
  next()
  document.title = getPageTitle(to.meta.title)
})
