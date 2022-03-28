import { useAuthStore } from "../store/user";

export default defineNuxtRouteMiddleware((to, from) => {

  const store = useAuthStore()
  
  console.log('LOGGED IN: ', store.isLoggedIn);
	if (store.isLoggedIn) {
		if (to.path.startsWith("/login")) {
			return navigateTo("/")
		}
	} else {
		if (!to.path.startsWith("/login")) {
			return navigateTo("/login")
		}
	}
})