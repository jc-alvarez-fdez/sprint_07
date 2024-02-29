import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;
  success?: string;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService
  ) {
      // redirect to home if already logged in
      if (this.accountService.userValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.form = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });

      // show success message after registration
      if (this.route.snapshot.queryParams.registered) {
        this.success = 'Registration successful';
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alert on submit
      this.error = '';
      this.success = '';

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.accountService.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from query parameters or default to home page
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  this.router.navigateByUrl(returnUrl);
              },
              error: error => {
                  this.error = error;
                  this.loading = false;
              }
          });
  }
}
