import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoginRoutingModule } from './login.routes';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './api/api.service';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    LoginRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [LoginComponent],
  providers: [ApiService]
})
export class LoginModule {}
