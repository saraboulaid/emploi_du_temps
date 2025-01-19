import { Component } from '@angular/core';
import { AuthService } from '../auth.service';  // Assurez-vous d'importer le service d'authentification

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoginMode: boolean = true;

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Gérer la réponse de succès
        console.log('Connexion réussie', response);

        // Sauvegarder le token
        this.authService.saveToken(response.token);

        // Afficher le token dans la console (ou ailleurs dans ton application)
        console.log('Token:', response.token);
        this.successMessage = 'Connexion réussie !'; // Message de succès
        this.clearMessagesAfterDelay();


        // Naviguer vers la page suivante
        this.authService.router.navigate(['/filiere']);
      },
      error: (error) => {
        // Gérer l'erreur
        this.errorMessage = 'Erreur de connexion: ' + (error.error.message || error.statusText);
      },
    });
  }


  onSignUp() {
    this.authService.register(this.email, this.password).subscribe({
      next: (response) => {
        // Gérer la réponse de succès
        console.log('Inscription réussie', response);
        this.successMessage = 'Inscription réussie !'; // Message de succès
        this.clearMessagesAfterDelay();
       this.switchToLogin();
      },
      error: (error) => {
        this.errorMessage = 'Erreur d\'inscription: ' + (error.error.message || error.statusText);
      },
    });
  }
  clearSuccessMessage() {
    this.successMessage = null;
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }

  switchToSignUp() {
    this.isLoginMode = false;
    this.errorMessage = null; // Réinitialiser l'erreur à chaque fois qu'on change de mode
  }

  switchToLogin() {
    this.isLoginMode = true;
    this.errorMessage = null; // Réinitialiser l'erreur à chaque fois qu'on change de mode
  }
  clearMessagesAfterDelay() {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 3000); // 3 secondes
  }
}
