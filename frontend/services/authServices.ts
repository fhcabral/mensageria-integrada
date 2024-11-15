class AuthService {
    private static instance: AuthService;
  
    private constructor() {}
  
    public static getInstance(): AuthService {
      if (!AuthService.instance) {
        AuthService.instance = new AuthService();
      }
      return AuthService.instance;
    }
  
    public getToken(): string | null {
      if (import.meta.client) {
        return localStorage.getItem("token");
      }
      return null;
    }
  
    public setToken(value: string): void {
      if (import.meta.client) {
        localStorage.setItem("token", value);
      }
    }
  
    public getUsername(): string | null {
      if (import.meta.client) {
        return localStorage.getItem("username");
      }
      return null;
    }
  
    public setUsername(value: string): void {
      if (import.meta.client) {
        localStorage.setItem("username", value);
      }
    }
  
    public getLoginTimeStamp(): number | null {
      if (import.meta.client) {
        const timestamp = localStorage.getItem("loginTimestamp");
        return timestamp ? parseInt(timestamp, 10) : null;
      }
      return null;
    }
  
    public setLoginTimeStamp(timestamp: number): void {
      if (import.meta.client) {
        localStorage.setItem("loginTimestamp", timestamp.toString());
      }
    }
  
    public logout(): void {
      if (import.meta.client) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("loginTimestamp");
      }
    }
  }
  
  export const authService = AuthService.getInstance();