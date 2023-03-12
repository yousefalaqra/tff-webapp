import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide: boolean = true;
  form: FormGroup;
  loading: boolean = false;
  isError: boolean = false;

  subscriptions: Array<Subscription> = [];

  constructor(
    private _fb: FormBuilder,
    private _api: ApiService,
    private _router: Router
  ) {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  get username(): AbstractControl | null {
    return this.form.get('username');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  onSubmit(): void {
    this.isError = false;
    this.loading = true;
    this.subscriptions.push(
      this._api
        .login({
          username: this.username?.value,
          password: this.password?.value,
        })
        .subscribe({
          next: (x) => {
            localStorage.setItem('access_token', x.access_token);
            this.loading = false;
            this._router.navigate(['/admin']);
          },
          error: (err) => {
            this.isError = true;
            this.loading = false
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
