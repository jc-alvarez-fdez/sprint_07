import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { User } from '@app/_interfaces';
import { AccountService } from '@app/_services';
import { LoginComponent } from '@app/_components/account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  user?: User | null;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logOut() {
    this.accountService.logOut();
  }
}
