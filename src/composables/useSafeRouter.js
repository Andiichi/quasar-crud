import { useRouter } from 'vue-router'

export function useSafeRouter() {
  const router = useRouter()

  function safeNavigate(routeName) {
    const routeExists = router.getRoutes().some(route => route.name === routeName)

    if (routeExists) {
      router.push({ name: routeName })
    } else {
      router.push('/pagina-não-existe-404')
    }
  }

  return { safeNavigate }
}