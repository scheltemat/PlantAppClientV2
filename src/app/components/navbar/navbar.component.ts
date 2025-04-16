import { Component } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isAuthenticated();

    // Subscribe to router events for auth updates
    this.router.events.subscribe(() => {
      this.isLoggedIn = this.authService.isAuthenticated();
    });
  }

  signOut() {
    this.authService.logout();
  }
}
