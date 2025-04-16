import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService, UserPlant } from "../../api.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userPlants: UserPlant[] = [];
  isLoading: boolean = false;
  errorMessage: string = "";

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUserPlants();
  }

  loadUserPlants() {
    this.isLoading = true;
    this.errorMessage = "";

    this.apiService.getUserPlants().subscribe({
      next: (plants) => {
        this.userPlants = plants;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = "Failed to load your garden. Please try again.";
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = "assets/images/default-plant.jpg";
  }
}
