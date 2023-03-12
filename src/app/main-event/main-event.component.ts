import { environment } from 'src/environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { retry, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationModel } from '../models/registration.model';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { EventResource } from '../resources/event.resource';

@Component({
  selector: 'app-main-event',
  templateUrl: './main-event.component.html',
  styleUrls: ['./main-event.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate(500),
      ]),
      transition('* => void', [
        animate(500, style({ opacity: 0, transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class MainEventComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  submitted: boolean = false;
  subscriptions: Array<Subscription> = [];
  form!: FormGroup;
  capacities: string[] = ['Industry', 'Media', 'Consumer', 'Student', 'Other'];
  displayFrom: boolean = false;

  featuredEvent: EventResource | undefined;

  errorLoadingFeaturedEvent = true; // The event registration is under maintance. Try againg in 1hr also you can contact us at: info@tffdei.org

  siteKey: string = '';

  get shippingZip() {
    return this.form.get('shippingZip');
  }

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  onStudentClick = false;

  requiredAddress: boolean = false;

  // addressValidation() {
  //   const addressFields: string[] = [
  //     'shippingFirstName',
  //     'shippingLastName',
  //     'shippingCompany',
  //     'shippingAddress',
  //     'shippingCity',
  //     'shippingApartment',
  //     'shippingState',
  //     'shippingZip',
  //   ];
  //   this.subscriptions.push(
  //     this.form.valueChanges.subscribe((value) => {
  //       const hasAddress = addressFields.some((x) => (value[x] ? true : false));
  //       if (hasAddress) {
  //         this.requiredAddress = true;
  //       } else {
  //         this.requiredAddress = false;
  //       }
  //     })
  //   );
  // }

  ngOnInit(): void {
    this.siteKey = environment.recaptcha.siteKey;
    this.form = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      company: ['', Validators.required],
      country: [''],
      capacity: ['', Validators.required],
      isReceiveCommunication: [false],
      // questions: ['', Validators.required],
      // shippingFirstName: [''],
      // shippingLastName: [''],
      // shippingCompany: [''],
      // shippingAddress: [''],
      // shippingCity: [''],
      // shippingApartment: [''],
      // shippingState: [''],
      // shippingZip: [
      //   '',
      //   Validators.compose([Validators.minLength(5), Validators.maxLength(5)]),
      // ],
      collegeName: [''],
    });

    this.handleCapacityChange();
    //this.addressValidation();

    // ${environment.api}
    this.subscriptions.push(
      this.http
        .get<EventResource>(`${environment.api}featured`)
        .pipe(retry(3))
        .subscribe({
          next: (val) => {
            this.featuredEvent = val;
          },
          error: () => {
            this.errorLoadingFeaturedEvent = true;
          },
        })
    );
  }

  handleCapacityChange() {
    this.form.get('capacity')?.valueChanges.subscribe((value) => {
      if (value === 'Student') {
        this.onStudentClick = true;
      } else {
        this.onStudentClick = false;
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'start',
      verticalPosition: 'top',
    });
  }

  postServer(data: RegistrationModel) {
    this.loading = true;
    this.subscriptions.push(
      this.http
        .post(`${environment.api}${this.featuredEvent?._id}`, data)
        .subscribe({
          next: (response) => {
            this.submitted = true;
            this.loading = false;
            // this.openSnackBar(
            //   'Success! Please check your email inbox for a confirmation message.',
            //   'Close'
            // );

            // scroll to top

            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          },
          error: (err) => {
            this.loading = false;
            this.openSnackBar(
              'Something went wrong' || err.error.message,
              'Close'
            );
          },
        })
    );
  }

  onRegister() {
    this.displayFrom = !this.displayFrom;
  }

  handleSuccess(event: any) {
    this.form.patchValue({
      recaptcha: event,
    });
  }

  handleResetAndExpire() {
    this.form.patchValue({
      recaptcha: null,
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.openSnackBar('Please fill all the fields', 'Close');
      return;
    } else {
      this.loading = true;
      this.postServer(this.form.value);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
