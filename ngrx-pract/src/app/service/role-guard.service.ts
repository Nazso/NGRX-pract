import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    //ez azért nem működik, mert az authentuikáció nem nincs impplementálva.
    // const expectedRole = route.data.expectedRole;
    // if (
    //   !this.auth.currentUserValue ||
    //   this.auth.currentUserValue.role < expectedRole
    //   ) {
    //   this.router.navigate(['forbidden']);
    //   return false;
    // }
    // return true;

    
    return false;
  }
}
