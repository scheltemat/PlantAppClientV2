import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserPlant } from "../../api.service";

@Component({
  selector: "app-garden-preview-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./garden-preview-table.component.html",
  styleUrls: ["./garden-preview-table.component.css"],
})
export class GardenPreviewTableComponent {
  @Input() plants: UserPlant[] = [];

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = "assets/images/default-plant.jpg";
  }
}
