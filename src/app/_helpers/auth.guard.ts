import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    if (user) {
      // check if route is restricted by role
      console.log('User AuthGuard', user.role)
      console.log('Route date role', route.data.roles)
      if (
        route.data['roles'] &&
        route.data['roles'].indexOf(user.role) === -1 
      ) {
        // role not authorised so redirect to home page
        this.router.navigate(['/login']);
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

// The auth guard is an angular route guard that's used to prevent unauthenticated or unauthorized users from accessing restricted routes, it does this by implementing the CanActivate interface which allows the guard to decide if a route can be activated with the canActivate() method. If the method returns true the route is activated (allowed to proceed), otherwise if the method returns false the route is blocked.

// The auth guard uses the authentication service to check if the user is logged in, if they are logged in it checks if their role is authorized to access the requested route. If they are logged in and authorized the canActivate() method returns true, otherwise it returns false and redirects the user to the login page.

// Angular route guards are attached to routes in the router config, this auth guard is used in app.routing.ts to protect the home page and admin page routes.