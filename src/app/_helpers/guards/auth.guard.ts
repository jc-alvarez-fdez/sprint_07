import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AccountService } from '@app/_services';

@Injectable({ providedIn: 'root' })


export class AuthGuard {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  canActivate(state: RouterStateSnapshot, activatedRoute: ActivatedRoute): boolean {
    const user = this.accountService.userValue;
        if (user) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

