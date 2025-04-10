import { Routes } from "@angular/router";
import { HealthCheckComponent } from "./health-check/health-check.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
  {
    path: "health-check",
    component: HealthCheckComponent,
    title: "Health Check",
  },
  { path: "", component: HomeComponent, title: "Home" }, // doesn't need "/"

  // Redirect for unmatched paths
  { path: "**", component: NotFoundComponent, title: "Page Not Found" },
];
