import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../_interfaces';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/login`, { email, password })
          .pipe(map(response => {
              const token = response.accessToken; // Asegúrate de verificar la respuesta real del servidor
              if (!token) {
                  throw new Error('Token not found in server response');
              }
              let user: User = response.user;
              user.token = token;
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);

              const redirectUrl = '/starships';
              this.router.navigate([redirectUrl]);

              return user;
          }));
  }

    logOut() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
      return this.http.post<any>(`${environment.apiUrl}/register`, user)
      .pipe(map(response => {
          const token = response.accessToken; // Asegúrate de verificar la respuesta real del servidor
          if (!token) {
              throw new Error('Token not found in server response');
          }

          let user: User = response.user;
          user.token = token;
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);

          const redirectUrl = '/starships';
          this.router.navigate([redirectUrl]);

          return user;
      }));
  }
}
