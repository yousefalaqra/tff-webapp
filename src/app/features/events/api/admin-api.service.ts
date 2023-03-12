import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryResource } from 'src/app/resources/entry.resource';
import { EventResource } from 'src/app/resources/event.resource';
import { environment } from 'src/environments/environment';
import { EventModel } from '../models/event.model';

@Injectable()
export class AdminApiService {
  private readonly API = `${environment.api}events`;

  constructor(private _http: HttpClient) {}

  getEvents(): Observable<Array<EventResource>> {
    return this._http.get<Array<EventResource>>(this.API);
  }

  getEvent(id: string): Observable<EventResource> {
    return this._http.get<EventResource>(`${this.API}/${id}`);
  }

  getEventEntries(id: string): Observable<Array<EntryResource>> {
    return this._http.get<Array<EntryResource>>(`${this.API}/entries/${id}`);
  }

  deleteEvent(id: string): Observable<any> {
    return this._http.delete(`${this.API}/${id}`);
  }

  createEvent(event: EventModel): Observable<EventResource> {
    return this._http.post<EventResource>(this.API, event);
  }

  updateEvent(id: string, event: EventModel): Observable<any> {
    return this._http.put(`${this.API}/${id}`, event);
  }

  exportEntries(id: string): Observable<any> {
    return this._http.post(`${this.API}/export/${id}`, {});
  }

  uploadEventArtwork(eventId: string, file: File): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers
      .set('Accept', '*/*')
      .set('Content-Type', 'multipart/form-data; boundary=<calculated when request is sent>');

    // Make http post request over api
    // with formData as req
    return this._http.post(`${this.API}/upload/${eventId}`, formData);
  }
}
