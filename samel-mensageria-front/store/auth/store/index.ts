import { authService } from "~/services/authServices";

export const authStorage = defineStore("auth", () => {
  const token = ref<string>(authService.getToken() || '0');

  function getToken() { 
    return authService.getToken();
  }

  function setToken(value: string) {
    authService.setToken(value);
    token.value = value;
  }

  function getUsername() {
    return authService.getUsername();
  }

  function setUsername(value: string) {
    authService.setUsername(value);
  }

  function getLoginTimeStamp(): number | null {
    return authService.getLoginTimeStamp();
  }

  function setLoginTimeStamp(timestamp: number) {
    authService.setLoginTimeStamp(timestamp);
  }

  function logout() {
    authService.logout();
    token.value = "";
  }

  return {
    token,
    setToken,
    getUsername,
    logout,
    setUsername,
    getToken,
    setLoginTimeStamp,
    getLoginTimeStamp
  };
});