import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-care-reminders-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./care-reminders-table.component.html",
  styleUrls: ["./care-reminders-table.component.css"],
})
export class CareRemindersTableComponent {
  @Input() reminders: { plantName: string; task: string; dueDate: Date }[] = [];
}
