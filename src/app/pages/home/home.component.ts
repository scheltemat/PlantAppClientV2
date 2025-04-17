import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService, UserPlant } from "../../api.service";
import { CareRemindersTableComponent } from "../../components/care-reminders-table/care-reminders-table.component";
import { GardenPreviewTableComponent } from "../../components/garden-preview-table/garden-preview-table.component";

export interface CareReminder {
  plantId: number;
  plantName: string;
  task: string;
  dueDate: Date;
  needsWatering: boolean;
}

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
  careReminders: CareReminder[] = [];
  miniUserPlants: UserPlant[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchUserPlants();
  }

  fetchUserPlants() {
    this.apiService.getUserPlants().subscribe({
      next: (plants) => {
        this.miniUserPlants = plants;

        const today = new Date();
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(today.getDate() + 12);

        this.careReminders = plants
          .filter((p) => {
            const nextWateringDate = p.nextWatering
              ? new Date(p.nextWatering)
              : null;

            return (
              p.needsWatering ||
              (nextWateringDate !== null &&
                nextWateringDate <= threeDaysFromNow)
            );
          })
          .map((p) => ({
            plantId: p.id,
            plantName: p.name,
            task: "Water",
            dueDate: p.nextWatering ? new Date(p.nextWatering) : new Date(),
            needsWatering: p.needsWatering,
          }))
          .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      },
      error: (err) => console.error("Error loading garden data:", err),
    });
  }
}
