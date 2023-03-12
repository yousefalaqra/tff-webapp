import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  private readonly API = `${environment.auth_api}`;

  constructor(private _http: HttpClient) {}

  login(model: {
    username: string;
    password: string;
  }): Observable<{ access_token: string }> {
    return this._http.post<{ access_token: string }>(
      `${this.API}login`,
      model
    );
  }
}
