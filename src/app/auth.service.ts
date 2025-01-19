import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/user/login';
  private registerUrl = 'http://localhost:8000/user/register';
  private authenticated = false;
  constructor(private http: HttpClient, private _router: Router) {}

  // Getter pour router
  get router(): Router {
    return this._router;
  }

  // Méthode de connexion
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    this.authenticated = true;
    return this.http.post<any>(this.apiUrl, body).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  // Méthode d'inscription
  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.registerUrl, body).pipe(
      catchError((error) => {
        // Loguer l'erreur pour débogage
        console.error('Erreur d\'inscription : ', error);
        throw error;  // Vous pouvez également envoyer une réponse d'erreur formatée ici
      })
    );
  }


  // Sauvegarde du token dans localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Récupérer le token depuis localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.authenticated;
  }

  // Déconnexion
  logout() {
    // Supprimer le token ou autres données d'authentification
    localStorage.removeItem('authToken'); // Exemple avec localStorage

    // Mettre à jour l'état d'authentification local si nécessaire
    this.authenticated = false;

    // Rediriger vers la page de connexion
    this.router.navigate(['/']).then(() => {
      // Utilisation de setTimeout pour s'assurer que la redirection a bien eu lieu avant le reload
      setTimeout(() => {
        window.location.reload(); // Rafraîchissement de la page après la redirection
      }, 100);
    });
  }

}
