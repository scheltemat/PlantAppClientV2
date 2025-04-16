import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    // If user is already logged in, redirect
    if (this.authService.isAuthenticated()) {
      this.router.navigate([""]);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.authService.storeToken(res.token);
        this.router.navigate([""]);
      },
      error: (err) => {
        this.isLoading = false;
        alert("Login failed!");
        console.error(err);
      },
    });
  }
}
