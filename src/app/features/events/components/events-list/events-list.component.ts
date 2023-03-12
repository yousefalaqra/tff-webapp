import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { EventResource } from 'src/app/resources/event.resource';
import { AdminApiService } from '../../api/admin-api.service';
import { EventModel } from '../../models/event.model';
import { DeleteEventComponent } from '../delete-event/delete-event.component';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent implements OnInit, OnDestroy {
  events: Array<EventResource> = [];
  subscriptions: Array<Subscription> = [];

  loading: boolean = false;
  error: boolean = false;
  displayedColumns: string[] = [
    'number',
    'title',
    'startDate',
    'endDate',
    'star',
  ];

  constructor(
    private _api: AdminApiService,
    public dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.subscriptions.push(
      this._api.getEvents().subscribe({
        next: (x) => {
          this.events = x;
          this.loading = false;
        },
        error: (err) => {
          this.error = true;
          this.loading = false;
        },
      })
    );
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(DeleteEventComponent);

    this.subscriptions.push(
      dialogRef
        .afterClosed()
        .pipe(
          switchMap((x: boolean) => {
            if (x) return this._api.deleteEvent(id);

            return of(false);
          })
        )
        .subscribe({
          next: (e) => {
            this.events.filter((event) => {
              console.log(event);
            });
          },
        })
    );
  }

  onAdd() {
    this.subscriptions.push(
      this._api
        .createEvent({ title: 'Default Event Title' } as EventModel)
        .subscribe({
          next: (x) => {
            this._router.navigate([`/admin/details/${x._id}`]);
          },
        })
    );
  }

  openDetails(id: number): void {
    this._router.navigate([`/admin/details/${id}`]);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
