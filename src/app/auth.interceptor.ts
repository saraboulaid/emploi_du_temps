import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Assure-toi que AuthService est bien dans ton projet

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le token d'authentification depuis le AuthService
    const token = this.authService.getToken();

    // Si un token est trouvé, on l'ajoute dans les en-têtes de la requête
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Ajouter le token dans l'en-tête Authorization
        }
      });

      return next.handle(cloned);  // Passer la requête modifiée
    }

    // Si aucun token n'est trouvé, passer la requête telle quelle
    return next.handle(req);
  }
}
