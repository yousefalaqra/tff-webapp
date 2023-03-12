interface Shipping {
  firstName: string;

  lastName: string;

  company: string;

  address: string;

  city: string;

  apartment: string;

  state: string;

  zip: string;
}

export interface EntryResource {
  firstName: string;

  lastName: string;

  email: string;

  title: string;

  company: string;

  country: string;

  capacity: string;

  isReceiveCommunication: boolean;

  // questions: string;
  collegeName: string;

  shipping: Shipping;

  registrationDate: Date;
}
