import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { HomeComponent, StarshipsListComponent } from './_pages';
import { LoginComponent } from './_components/account/login/login.component';
import { RegisterComponent } from './_components/account/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './_services';
import { User } from './_interfaces';
import { HeaderComponent } from "./_components/header/header.component";
import { StarshipFileComponent } from './_components/starships';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        NavbarComponent,
        RouterLink,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        HomeComponent,
        StarshipsListComponent,
        StarshipFileComponent,
    ]
})

export class AppComponent {
  title = 'Star Wars';
  user?: User | null;
  userFirstName: string | null = null; // Para saludar al usuario al inciciar sesión

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe(user => {
      this.user = user;
      // Actualizar el nombre del usuario después de iniciar sesión
      this.userFirstName = user?.firstName || null;
    });
  }

    logout() {
        this.accountService.logOut();
        this.router.navigate(['/']);  // Redirige a la página de inicio después de cerrar sesión
    }

    toggleLogin() {
      if (this.user) {
        this.logout();
      } else {
        this.router.navigate(['/account/login']);
      }
    }

    // Método para obtener el nombre del usuario
    getUserName(): string | null {
      return this.userFirstName;
  }
}
