import { Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { HealthCheckComponent } from "./pages/health-check/health-check.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { LoginComponent } from "./pages/login/login.component";
import { FindPlantComponent } from "./pages/find-plant/find-plant.component";
import { FindSinglePlantComponent } from "./pages/find-single-plant/find-single-plant.component";

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
  {
    path: "find-a-plant",
    component: FindPlantComponent,
    title: "Search Plants",
    canActivate: [AuthGuard],
  },
  {
    path: "find-a-plant/:id",
    component: FindSinglePlantComponent,
    title: "View Plant",
    canActivate: [AuthGuard],
  },

  // Edge case for invalid routes
  { path: "**", component: NotFoundComponent, title: "Page Not Found" },
];
