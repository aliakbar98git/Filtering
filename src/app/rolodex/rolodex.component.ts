import { Component, OnDestroy, OnInit } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { Subject } from "rxjs";
import { Contact } from "../model/contact";
import { takeUntil } from "rxjs/operators";
import { ContactType } from "../model/contact.type";

@Component({
  selector: "app-rolodex",
  templateUrl: "./rolodex.component.html",
  styleUrls: ["./rolodex.component.css"],
})
export class RolodexComponent implements OnInit, OnDestroy {
  public contacts: Contact[];
  public contact: Contact = null;
  private destroyed: Subject<any> = new Subject();
  selectedContact: Contact;
  contactType: ContactType = ContactType.ALL;

  constructor(private contactsService: ContactsService) {
    this.contactsService.contactsSubject.subscribe((res) => {
      this.contacts = res;
    });
  }

  public ngOnInit() {
    this.contactsService
      .getTypeOfContacts()
      .pipe(takeUntil(this.destroyed))
      .subscribe((contactType) => {
        debugger;
        this.contactsService
          .getContacts()
          .pipe(takeUntil(this.destroyed))
          .subscribe((res) => {
            contactType === ContactType.ALL
              ? (this.contacts = res)
              : (this.contacts = res.filter(
                  (contact) => contact.contactType === contactType
                ));
          });
      });

    // this.contactsService
    //   .getTypeOfContacts()
    //   .pipe(takeUntil(this.destroyed))
    //   .subscribe((contactType) => {
    //     this.contactsService
    //       .getContacts()
    //       .pipe(takeUntil(this.destroyed))
    //       .subscribe((contacts) =>
    //         contactType === ContactType.ALL
    //           ? (this.contacts = contacts)
    //           : (this.contacts = contacts.filter(
    //               (contact) => contact.contactType === contactType
    //             ))
    //       );
    //   });
  }

  public ngOnDestroy() {
    this.destroyed.next(null);
  }

  public setContact(contact: Contact): void {
    this.contact = contact;
  }

  onContactSelected(contact: Contact): void {
    this.selectedContact = contact;
  }

  isContactInList(contact: Contact): boolean {
    return this.contacts.findIndex((c) => c.id === contact.id) !== -1;
  }
}
