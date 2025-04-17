import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../api.service";
import { CareReminder } from "../../pages/home/home.component";

@Component({
  selector: "app-care-reminders-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./care-reminders-table.component.html",
  styleUrls: ["./care-reminders-table.component.css"],
})
export class CareRemindersTableComponent {
  @Input() reminders: CareReminder[] = [];
  @Output() watered = new EventEmitter<void>();
  loadingPlantId: number | null = null;

  constructor(private apiService: ApiService) {}

  markAsWatered(reminder: CareReminder) {
    this.loadingPlantId = reminder.plantId;
    this.apiService.waterPlant(reminder.plantId).subscribe({
      next: () => {
        this.loadingPlantId = null;
        this.watered.emit();
      },
      error: (err) => {
        this.loadingPlantId = null;
        console.error("Failed to water plant:", err);
      },
    });
  }
}
