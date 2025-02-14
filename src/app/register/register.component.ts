import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords don't match!";
      return;
    }

    // Check if the user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((user: any) => user.username === this.name)) {
      this.errorMessage = 'Username already exists!';
      return;
    }

    // Save the new user to localStorage
    const newUser = { username: this.name, password: this.password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to the login page after successful registration
    this.router.navigate(['/login']);
  }
}
