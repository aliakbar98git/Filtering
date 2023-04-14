import { Component } from "@angular/core";
import { ContactType } from "../model/contact.type";
import { ContactsService } from "../contacts.service";

@Component({
  selector: "app-contact-type-selector",
  templateUrl: "./contact-type-selector.component.html",
  styleUrls: ["./contact-type-selector.component.css"],
})
export class ContactTypeSelectorComponent {
  public contactTypes = ContactType;
  public selectedContactType: ContactType = ContactType.ALL;

  constructor(private contactsService: ContactsService) {}

  onSelectContactType(type: ContactType): void {
    this.contactsService.setTypeOfContacts(type);
  }
}
