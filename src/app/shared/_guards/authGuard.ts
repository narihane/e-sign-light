import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { NotificationService } from '../_services/notifications.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService,
      private notificationService:NotificationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
          // check if route is restricted by role
          if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
              // role not authorised so redirect to home page
              this.notificationService.showError("You can't access this page", "Restricted to Admins")
              this.router.navigate(['/']);
              return false;
          }

          // authorised so return true
          return true;
      }

         // not logged in so redirect to login page with the return url
         this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
         return false;
    }
}
