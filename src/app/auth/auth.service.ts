import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly TOKEN_KEY = "jwt_token";
  private router = inject(Router);
  private jwtHelper = inject(JwtHelperService);

  storeToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(["/login"]);
  }
}
