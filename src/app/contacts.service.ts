import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, Subject } from "rxjs";
import { ContactType } from "./model/contact.type";
import { Contact } from "./model/contact";
import { contactsInjectionToken } from "./contacts";

@Injectable()
export class ContactsService {
  private selectedType: BehaviorSubject<ContactType> =
    new BehaviorSubject<ContactType>(ContactType.ALL);
  private contacts: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>(
    []
  );

  contactsSubject: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>(
    []
  );
  //   {
  //   address:'dd',
  //   name:'PRIVATE',
  //   birthDate:String(new Date()),
  //   city:'Istanbul',
  //   contactType:ContactType.PRIVATE,
  //   country:'chines',
  //   id:1,
  //   phoneNumber:'+905444395559',
  //   surname:'Aliakbar'
  // },{
  //   address:'dd',
  //   name:'BUSINESS',
  //   birthDate:String(new Date()),
  //   city:'ff',
  //   contactType:ContactType.BUSINESS,
  //   country:'Russia',
  //   id:2,
  //   phoneNumber:'+905444395559',
  //   surname:'Esmaeili'
  // },{
  //   address:'dd',
  //   name:'PRIVATE',
  //   birthDate:String(new Date()),
  //   city:'ff',
  //   contactType:ContactType.PRIVATE,
  //   country:'Turkey',
  //   id:3,
  //   phoneNumber:'666666666',
  //   surname:'abbas'
  // }

  constructor(@Inject(contactsInjectionToken) private contactsList: Contact[]) {
    this.contactsSubject.next(contactsList);
  }

  public getContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  public setTypeOfContacts(chosenElement: ContactType): void {
    debugger;
    this.selectedType.next(chosenElement);
  }

  public getTypeOfContacts(): Observable<ContactType> {
    return this.selectedType.asObservable();
  }
}
