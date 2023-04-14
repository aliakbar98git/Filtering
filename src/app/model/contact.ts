import {ContactType} from './contact.type';

export interface Contact {
  id: number;
  name: string;
  surname: string;
  birthDate: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  contactType: ContactType;
}
