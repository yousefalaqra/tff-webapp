import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { EntryResource } from 'src/app/resources/entry.resource';
import { EventResource } from 'src/app/resources/event.resource';
import { environment } from 'src/environments/environment';
import { AdminApiService } from '../../api/admin-api.service';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  eventId: string = '';

  event: EventResource | undefined = undefined;
  subscriptions: Array<Subscription | undefined> = [];

  enableEdit: boolean = false;

  form: FormGroup;
  entries: Array<EntryResource> = [];

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'title',
    'company',
    'country',
    'capacity',
    'college',
    'apt',
    'city',
    'state',
    'zipCode',
    'isSubscribed',
    'registrationDate',
  ];

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  imgSet: boolean = false;

  imgFile: File | null = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _api: AdminApiService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.form = this._fb.group({
      title: [this.event?.title, Validators.required],
      description: [this.event?.description],
      isMain: [this.event?.isMain],
      isPublished: [this.event?.isPublished],
      startTime: [this.event?.startTime],
      endTime: [this.event?.endTime],
      src: [this.event?.src],
    });
  }

  ngOnInit() {
    this.subscriptions.push(
      this._activatedRoute.paramMap
        .pipe(
          switchMap((x) => {
            this.eventId = x.get('eventId')!;
            return this._api.getEvent(this.eventId);
          })
        )
        .subscribe((x) => {
          this.event = x;
          this.initForm();

          this.subscriptions.push(
            this._api.getEventEntries(this.eventId).subscribe((entries) => {
              this.entries = entries;
            }) 
          );
          //this.entries = this.event?.entries!;
        })
    );
  }

  initForm(): void {
    this.form = this._fb.group({
      title: [this.event?.title, Validators.required],
      // description: [this.event?.description],
      isMain: [this.event?.isMain],
      isPublished: [this.event?.isPublished],
      startTime: [this.event?.startTime],
      endTime: [this.event?.endTime],
      src: [this.event?.src],
    });

    this.subscriptions.push(
      this.title?.valueChanges.subscribe((x) => {
        if (x != this.event?.title) this.enableEdit = true;
      }),
      // this.description?.valueChanges.subscribe((x) => {
      //   if (x != this.event?.description) this.enableEdit = true;
      // }),
      this.isMain?.valueChanges.subscribe((x) => {
        if (x != this.event?.isMain) this.enableEdit = true;
      }),
      this.isPublished?.valueChanges.subscribe((x) => {
        if (x != this.event?.isPublished) this.enableEdit = true;
      }),
      this.startTime?.valueChanges.subscribe((x) => {
        if (x != this.event?.startTime) this.enableEdit = true;
      }),
      this.endTime?.valueChanges.subscribe((x) => {
        if (x != this.event?.endTime) this.enableEdit = true;
      }),
      this.endTime?.valueChanges.subscribe((x) => {
        if (x != this.event?.endTime) this.enableEdit = true;
      }),
      this.src?.valueChanges.subscribe((x) => {
        if (x != this.event?.src) this.enableEdit = true;
      })
    );
  }

  get title(): AbstractControl | null {
    return this.form.get('title');
  }
  // get description(): AbstractControl | null {
  //   return this.form.get('description');
  // }
  get isMain(): AbstractControl | null {
    return this.form.get('isMain');
  }
  get isPublished(): AbstractControl | null {
    return this.form.get('isPublished');
  }
  get startTime(): AbstractControl | null {
    return this.form.get('startTime');
  }
  get endTime(): AbstractControl | null {
    return this.form.get('endTime');
  }
  get src(): AbstractControl | null {
    return this.form.get('src');
  }

  onSave(): void {
    let eventModel = {
      // description: this.description?.value,
      endTime: this.endTime?.value,
      isMain: this.isMain?.value,
      isPublished: this.isPublished?.value,
      title: this.title?.value,
      startTime: this.startTime?.value,
      src: this.src?.value,
    } as EventModel;

    this.subscriptions.push(
      this._api.updateEvent(this.eventId, eventModel).subscribe((_) => {
        this.enableEdit = false;
        this.openSnackBar();
      })
    );
  }

  openSnackBar() {
    this._snackBar.open('Event has been updated successfully!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onExport(): void {
    this.subscriptions.push(
      this._api.exportEntries(this.eventId).subscribe((x) => {
        let uri = `${x.uri}`;
        let link = document.createElement('a');
        link.href = uri;
        link.click();
      })
    );

    // save file to storage and get url without api call
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (x) x.unsubscribe();
    });
  }

  onFileUpload(event: any) {
    let x = event.target.files;

    let mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this._snackBar.open('Ops! file type is not supported', 'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      if (this.event) this.event.img = reader.result as string;

      this.imgFile = event.target.files[0];
      this.imgSet = true;
    };
  }

  onUploadImg(): void {
    this.subscriptions.push(
      this._api
        .uploadEventArtwork(this.eventId, this.imgFile as File)
        .subscribe((_) => {
          this._snackBar.open(
            'Event artwork has been updated successfully!',
            'Splash',
            {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            }
          );
          this.imgSet = true;
        })
    );
  }
}
