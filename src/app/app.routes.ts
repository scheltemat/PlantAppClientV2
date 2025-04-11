import { Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { HealthCheckComponent } from "./pages/health-check/health-check.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { LoginComponent } from "./pages/login/login.component";

export const routes: Routes = [
  // Unauthenticated routes
  {
    path: "health-check",
    component: HealthCheckComponent,
    title: "Health Check",
  },
  { path: "login", component: LoginComponent, title: "Login" },

  // Authenticated routes
  {
    path: "",
    component: HomeComponent,
    title: "Home",
    canActivate: [AuthGuard],
  },

  // Edge case for invalid routes
  { path: "**", component: NotFoundComponent, title: "Page Not Found" },
];
