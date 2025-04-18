import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: "app-register",
  standalone: true, // important for standalone components
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        phoneNumber: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get("password")?.value;
    const confirmPassword = form.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    const { email, phoneNumber, password, confirmPassword } =
      this.registerForm.value;

    this.authService
      .register(email, phoneNumber, password, confirmPassword)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(["/login"]); // 👈 navigate on success
        },
        error: (err) => {
          this.isLoading = false;
          console.error("Registration error", err);
        },
      });
  }
}
