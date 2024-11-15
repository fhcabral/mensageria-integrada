import { authStorage } from "~/store/auth/store";
import { storeList } from "~/store/msg-list/store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const loadingStore = storeList();
  loadingStore.setLoading(true);

  if (import.meta.server) return;

  const storage = authStorage();
  const auth = storage.getToken();
  const loginTimestamp = storage.getLoginTimeStamp();

  if (!auth && to.path !== '/login') {
    return navigateTo('/login', { replace: true });
  }
  else if(auth && to.path === '/') {
    return navigateTo('/home', { replace: true });
  }

  if (auth && loginTimestamp) {
    const currentTime = Date.now();
    const sessionDuration = currentTime - loginTimestamp;
    
    if (sessionDuration > (12 * 60 * 60 * 1000)) {
      storage.logout();
      return await navigateTo("/login", { replace: true });
    }
    storage.setLoginTimeStamp(currentTime);
  }
  loadingStore.setLoading(false);
});
