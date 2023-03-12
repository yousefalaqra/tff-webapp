import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.gurad';
import { LivePageComponent } from './live-page/live-page.component';
import { MainEventComponent } from './main-event/main-event.component';

const routes: Routes = [
  { path: '', component: MainEventComponent },
  { path: 'live/:eventId', component: LivePageComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/events/events.module').then((m) => m.EventsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
