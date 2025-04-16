import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService, UserPlant } from "../../api.service";
import { CareRemindersTableComponent } from "../../components/care-reminders-table/care-reminders-table.component";
import { GardenPreviewTableComponent } from "../../components/garden-preview-table/garden-preview-table.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    CareRemindersTableComponent,
    GardenPreviewTableComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  careReminders = [
    { plantName: "Fiddle Leaf Fig", task: "Water", dueDate: new Date() },
    {
      plantName: "Snake Plant",
      task: "Fertilize",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
  ];

  miniUserPlants: UserPlant[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadMiniGardenPreview();
  }

  loadMiniGardenPreview() {
    this.apiService.getUserPlants().subscribe({
      next: (plants) => (this.miniUserPlants = plants),
      error: (err) => console.error("Error loading garden preview:", err),
    });
  }
}
