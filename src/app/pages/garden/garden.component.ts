import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService, UserPlant } from "../../api.service";

@Component({
  selector: "app-garden",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./garden.component.html",
  styleUrls: ["./garden.component.css"],
})
export class GardenComponent implements OnInit {
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

  removePlant(plantId: number) {
    this.apiService.removePlantFromGarden(plantId).subscribe({
      next: () => {
        this.userPlants = this.userPlants.filter((p) => p.id !== plantId);
      },
      error: (err) => {
        console.error("Failed to remove plant:", err);
        this.errorMessage = "Could not remove the plant. Please try again.";
      },
    });
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = "assets/images/default-plant.jpg";
  }
}
