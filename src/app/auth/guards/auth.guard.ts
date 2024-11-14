import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService);
  // const router = inject(Router);

  // if (authService.isLoggedIn()) {
  //   console.log("hollaaa")
  //   return true; // Permite el acceso si está autenticado
  // } else {
  //   console.log("hollaaa")
  //   router.navigate(['/auth/login']); // Redirige a la página de login si no está autenticado
  //   return false;
  // }
  return true;
};
