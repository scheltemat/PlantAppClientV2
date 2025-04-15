import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../api.service";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-find-plant",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./find-plant.component.html",
  styleUrls: ["./find-plant.component.css"],
})
export class FindPlantComponent {
  searchQuery: string = "";
  searchResults: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = "";

  constructor(private apiService: ApiService) {}

  searchPlants() {
    this.searchQuery = this.searchQuery.trim();

    if (!this.searchQuery) {
      this.errorMessage = "Please enter a search term";
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";
    this.searchResults = [];

    this.apiService.searchPlants(this.searchQuery).subscribe({
      next: (response) => {
        this.searchResults = response.plants;
        this.isLoading = false;
        console.log(this.searchResults);
      },
      error: (err) => {
        this.isLoading = false;
        this.handleSearchError(err);
      },
    });
  }

  addToGarden(plantId: number, plantName: string) {
    this.apiService.addPlantToGarden(plantId).subscribe({
      next: () => {
        alert(`${plantName} added to your garden successfully!`);
      },
      error: (err) => {
        console.error("Error adding plant:", err);
        alert(`Failed to add ${plantName} to your garden. Please try again.`);
      },
    });
  }

  getPlantData(plant: any, key: string): string | undefined {
    const item = plant.data.find((d: any) => d.key === key);
    return item?.value;
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = "assets/images/default-plant.jpg";
  }

  private handleSearchError(err: any) {
    if (err.status === 404) {
      this.errorMessage = "The plant service is currently unavailable";
    } else if (err.status === 401) {
      this.errorMessage = "Please login to search plants";
    } else if (err.status === 400) {
      this.errorMessage = "Invalid search request";
    } else {
      this.errorMessage = "Failed to search plants. Please try again later.";
    }
  }
}
