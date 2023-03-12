import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {}

  onLogout() {
    localStorage.removeItem('access_token');
    this._router.navigate(['/login']);
  }
}
