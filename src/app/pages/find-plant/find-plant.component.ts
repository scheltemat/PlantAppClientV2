import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService, ExternalPlant, AddPlantRequest } from "../../api.service";
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
  searchResults: ExternalPlant[] = [];
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

  addToGarden(plant: ExternalPlant, event: MouseEvent) {
    event.stopPropagation();

    // Extract requirements with better handling
    const waterReq = this.getPlantData(plant, "Water requirement") || "Moist";
    const lightReq = this.getPlantData(plant, "Light requirement") || "Medium";

    const plantToSend: AddPlantRequest = {
      id: plant.id,
      name: plant.name,
      imageUrl: plant.images?.thumb || "",
      waterRequirement: waterReq,
      lightRequirement: lightReq,
    };

    this.apiService.addPlantToGarden(plantToSend).subscribe({
      next: (response) => {
        console.log("Plant added with requirements:", response);
        alert(`${plant.name} added to your garden successfully!`);
      },
      error: (err) => {
        console.error("Error adding plant:", err);
        alert(`Failed to add ${plant.name} to your garden. Please try again.`);
      },
    });
  }

  getPlantData(plant: ExternalPlant, key: string): string | undefined {
    // Some keys might have different capitalization in the API
    const normalizedKey = key.toLowerCase();

    // Find the matching data item (case insensitive)
    const item = plant.data.find((d) =>
      d.key.toLowerCase().includes(normalizedKey)
    );

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
