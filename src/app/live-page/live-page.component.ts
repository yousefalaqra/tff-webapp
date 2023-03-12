import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { EventApiService } from '../api/event.api.service';
import { EventResource } from '../resources/event.resource';

@Component({
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.scss'],
})
export class LivePageComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  event: EventResource | null = null;
  loading: boolean = true;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _api: EventApiService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.subscriptions.push(
      this._activatedRoute.paramMap
        .pipe(switchMap((x) => this._api.getEvent(x.get('eventId')!)))
        .subscribe((event) => {
          this.event = event;
          this.loading = false;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
