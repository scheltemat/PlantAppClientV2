import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ApiService } from "../api.service";

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

  constructor(private api: ApiService) {}

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
