import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { HealthService } from "../../services/api-health/health.service";

@Component({
  selector: "app-health-check",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./health-check.component.html",
  styleUrl: "./health-check.component.css",
})
export class HealthCheckComponent {
  message: string = "";
  loading: boolean = true;

  constructor(private api: HealthService) {}

  ngOnInit(): void {
    this.api.getHealthCheck().subscribe({
      next: (response) => {
        // Response is an object
        this.message = response.message;
        this.loading = false;
      },
      error: (err) => {
        this.message = "Failed to connect to API";
        this.loading = false;
      },
    });
  }
}
