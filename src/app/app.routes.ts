import { Routes } from "@angular/router";
import { AuthGuard } from "./services/auth/auth.guard";
import { HealthCheckComponent } from "./pages/health-check/health-check.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { LoginComponent } from "./pages/login/login.component";
import { FindPlantComponent } from "./pages/find-plant/find-plant.component";
import { PlantDetailComponent } from "./pages/plant-detail/plant-detail.component";
import { GardenComponent } from "./pages/garden/garden.component";
import { RegisterComponent } from "./pages/register/register.component";

export const routes: Routes = [
  // Unauthenticated routes
  {
    path: "health-check",
    component: HealthCheckComponent,
    title: "Health Check",
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Login",
  },
  {
    path: "register",
    component: RegisterComponent,
    title: "Register",
  },

  // Authenticated routes
  {
    path: "",
    component: HomeComponent,
    title: "Dashboard",
    canActivate: [AuthGuard],
  },
  {
    path: "garden",
    component: GardenComponent,
    title: "My Garden",
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
    component: PlantDetailComponent,
    title: "View Plant",
    canActivate: [AuthGuard],
  },

  // Edge case for invalid routes
  { path: "**", component: NotFoundComponent, title: "Page Not Found" },
];
