import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { LoginComponent } from '../account/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../account/register/register.component';
import { ComunicationService } from '../../_services';
import { Subscription } from 'rxjs';
import { AccountService } from '../../_services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {

  // private subscription: Subscription;
  //public userToken = this.AccountService.userToken;

  // public menuItems = routes
  //   .filter(route => route && route.path)
  //   .filter(route => route && !route.path?.includes(':'))
  //   .filter(route => route && !route.path?.includes('**'))
  //   .filter(route => route && !route.path?.includes('not-found'));

  /* constructor(
    public dialog: MatDialog,
    private dialogService: ComunicationService,
    public AccountService: AccountService
    ) {
    this.subscription = this.dialogService.closeDialog.subscribe(() => {
      this.dialog.closeAll();
    });
  }
 */
/*   openLogIn(): void {
    this.dialog.open(LoginComponent);
  } */

/*   openRegister(): void {
    this.dialog.open(RegisterComponent);
  }

  logOut(): void {
    this.AccountService.logOut();
  }
*/
  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
