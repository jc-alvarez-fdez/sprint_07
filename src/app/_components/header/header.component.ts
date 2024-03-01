import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
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
  title: string = 'starwars';
  user?: User | null;
  userFirstName: string | null = null; // Para saludar al usuario al inciciar sesión

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe(user => {
      this.user = user;
      // Actualizar el nombre del usuario después de iniciar sesión
      this.userFirstName = user?.firstName || null;
    });
  }

    logOut() {
        this.accountService.logOut();
        this.router.navigate(['/']);  // Redirige a la página de inicio después de cerrar sesión
    }

    toggleLogin() {
      if (this.user) {
        this.logOut();
      } else {
        this.router.navigate(['/account/login']);
      }
    }

    // Método para obtener el nombre del usuario
    getUserName(): string | null {
      return this.userFirstName;
  }
}
