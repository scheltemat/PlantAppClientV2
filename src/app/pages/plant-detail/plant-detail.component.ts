import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ApiService, ExternalPlant, AddPlantRequest } from "../../api.service";

@Component({
  selector: "app-plant-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./plant-detail.component.html",
  styleUrls: ["./plant-detail.component.css"],
})
export class PlantDetailComponent implements OnInit {
  plant: ExternalPlant | null = null;
  isLoading = true;
  isAdding = false;
  errorMessage = "";

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (isNaN(id)) {
      this.errorMessage = "Invalid plant ID";
      this.isLoading = false;
      return;
    }

    this.apiService.getPlantById(id).subscribe({
      next: (plant) => {
        this.plant = plant;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = "Failed to load plant details.";
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  getPlantData(key: string): string | undefined {
    return this.plant?.data.find((d) => d.key === key)?.value;
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = "assets/images/default-plant.jpg";
  }

  addToGarden() {
    if (!this.plant) return;

    const plantToSend: AddPlantRequest = {
      id: this.plant.id,
      name: this.plant.name,
      imageUrl: this.plant.images?.thumb || "",
    };

    this.isAdding = true;

    this.apiService.addPlantToGarden(plantToSend).subscribe({
      next: () => {
        alert(`${this.plant!.name} added to your garden successfully!`);
        this.isAdding = false;
      },
      error: (err) => {
        console.error("Error adding plant:", err);
        alert(
          `Failed to add ${this.plant!.name} to your garden. Please try again.`
        );
        this.isAdding = false;
      },
    });
  }
}
