import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { jwtInterceptor } from "./services/auth/jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
};
