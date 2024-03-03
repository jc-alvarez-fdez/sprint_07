import { Routes } from '@angular/router';
import { HomeComponent } from './_pages';
import { StarshipsListComponent } from './_pages'
import { StarshipFileComponent } from './_components/starships';
import { AuthGuard } from './_helpers/guards/auth.guard';
import { LoginComponent } from './_components/account/login/login.component';
import { RegisterComponent } from './_components/account/register/register.component';

export const routes: Routes = [
  { path: 'home',
    component: HomeComponent
  },
  { path: 'starships',
    component: StarshipsListComponent,
   canActivate: [AuthGuard]
   },
  { path: 'starships/:id',
    component: StarshipFileComponent
  },
  { path: 'account/login',
    component: LoginComponent
  },
  { path: 'account/register',
  component: RegisterComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];
