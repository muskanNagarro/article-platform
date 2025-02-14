import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin() {
    const user = JSON.parse(localStorage.getItem('users') || '[]').find(
      (user: any) => user.username === this.email && user.password === this.password
    );
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Invalid Login Credentials';
    }
  }
}
