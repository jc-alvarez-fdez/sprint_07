import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { HomeComponent } from './_pages';
import { StarshipsListComponent } from './_pages'
import { LoginComponent } from '../app/_components/account/login/login.component';
import { RegisterComponent } from './_components/account/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './_services';
import { User } from './_interfaces';
import { HeaderComponent } from "./_components/header/header.component";


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
        HeaderComponent
    ]
})
export class AppComponent {
  title = 'Star Wars';
  
}
