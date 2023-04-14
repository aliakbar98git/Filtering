import { TestBed } from '@angular/core/testing';

import { ContactsService } from './contacts.service';
import { ContactType } from './model/contact.type';
import { take } from 'rxjs/operators';
import { contacts, contactsInjectionToken } from './contacts';
import { Contact } from './model/contact';

describe('ContactsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ContactsService,
      {
        provide: contactsInjectionToken,
        useValue: contacts,
      }
    ],
  }));

  describe('when type is set to PRIVATE', () => {
    it('should emit only private contacts', (done) => {
      const service: ContactsService = TestBed.get(ContactsService);
      service.setTypeOfContacts(ContactType.PRIVATE);

      service.getContacts()
        .pipe(take(1))
        .subscribe(contactsFromService => {
          expect(contactsFromService).toEqual(
            TestBed.inject<Contact[]>(contactsInjectionToken).filter(contact => contact.contactType === ContactType.PRIVATE),
          );
          done();
        });
    });
  });
});
