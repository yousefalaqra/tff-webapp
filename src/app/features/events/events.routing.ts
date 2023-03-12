import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsComponent } from './containers/events/events.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
        { path: 'events', component: EventsListComponent },
        { path: 'details/:eventId', component: EventDetailsComponent },
        { path: '', redirectTo: 'events' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
