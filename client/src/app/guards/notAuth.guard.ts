import { Injectable }            from '@angular/core';
import { CanActivate, Router }   from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';



@Injectable()
export class NotAuthGuard implements CanActivate {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    canActivate() {
        if (this.authenticationService.loggedIn()) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}
