import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainEventComponent } from './main-event/main-event.component';
import { httpInterceptorProviders } from './interceptors';
import { LivePageComponent } from './live-page/live-page.component';
import { SafePipe } from './safe.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//import { RegisterComponent } from './features/register/register.component';
//import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { NgxCaptchaModule } from 'ngx-captcha';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoadingIconComponent,
    MainEventComponent,
    LivePageComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    CommonModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  providers: [
    httpInterceptorProviders,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
