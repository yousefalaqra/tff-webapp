import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntryModel } from '../models/entry.model';
import { EventResource } from '../resources/event.resource';

@Injectable({
  providedIn: 'root',
})
export class EventApiService {
  private readonly api = `${environment.api}`;

  constructor(private _http: HttpClient) {}

  register(eventId: number, model: EntryModel): Observable<any> {
    return this._http.post(`${this.api}${eventId}`, model);
  }

  getFeaturedEvent(): Observable<EventResource>{
    return this._http.get<EventResource>(`${this.api}featured`)
  }
  getEvent(id: string): Observable<EventResource>{
    return this._http.get<EventResource>(`${this.api}${id}`)
  }
}
