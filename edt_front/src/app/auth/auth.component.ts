import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true; // Définit le mode initial
  email: string = '';
  password: string = '';

  // Bascule vers SignUp
  switchToSignUp() {
    this.isLoginMode = false;
  }

  // Bascule vers Login
  switchToLogin() {
    this.isLoginMode = true;
  }

  // Fonction pour gérer la connexion
  onLogin() {
    console.log('Logging in with:', this.email, this.password);
    // Ajouter votre logique ici
  }

  // Fonction pour gérer l'inscription
  onSignUp() {
    console.log('Signing up with:', this.email, this.password);
    // Ajouter votre logique ici
  }
}
