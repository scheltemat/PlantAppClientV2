import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

// Auth response interface
interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly TOKEN_KEY = "jwt_token";
  private router = inject(Router);
  private jwtHelper = inject(JwtHelperService);
  private http = inject(HttpClient);

  register(
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
  ): Observable<void> {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/auth/register`,
      {
        email,
        phoneNumber,
        password,
        confirmPassword,
      }
    );
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/api/auth/login`,
      {
        email,
        password,
      }
    );
  }

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

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(["/login"]);
  }
}
