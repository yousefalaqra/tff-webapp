import { NgModule } from '@angular/core';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsComponent } from './containers/events/events.component';
import { EventsRoutingModule } from './events.routing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AdminApiService } from './api/admin-api.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteEventComponent } from './components/delete-event/delete-event.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    EventsRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatSnackBarModule
  ],
  declarations: [EventsListComponent, EventsComponent, DeleteEventComponent, EventDetailsComponent],
  providers: [AdminApiService],
})
export class EventsModule {}
