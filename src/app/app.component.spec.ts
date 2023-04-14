import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RolodexComponent } from './rolodex/rolodex.component';
import { ContactTypeSelectorComponent } from './contact-type-selector/contact-type-selector.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { By } from '@angular/platform-browser';
import { contacts, contactsInjectionToken } from './contacts';
import { DebugElement } from '@angular/core';
import { ContactType } from './model/contact.type';
import { ContactsService } from './contacts.service';
import { FormsModule } from '@angular/forms';
import { Contact } from './model/contact';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        AppComponent,
        RolodexComponent,
        ContactTypeSelectorComponent,
        BusinessCardComponent,
      ],
      providers: [
        ContactsService,
        {
          provide: contactsInjectionToken,
          useValue: contacts,
        }
      ],
    }).compileComponents();
  }));

  const getListItemsTexts = (debugElement: DebugElement) => debugElement.queryAll(By.css('li'))
    .map(item => item.nativeElement.innerText);

  const getContactNames = (type: ContactType = ContactType.ALL) => TestBed.inject<Contact[]>(contactsInjectionToken)
    .filter(contact => type === ContactType.ALL || contact.contactType === type)
    .map(contact => `${contact.name} ${contact.surname}`);

  function createComponent() {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement = fixture.debugElement;
    fixture.detectChanges();
    return {fixture, debugElement};
  }

  const changeContactsType = (debugElement: DebugElement, fixture: ComponentFixture<AppComponent>, type: ContactType) => {
    const radioButton = debugElement.query(By.css(`#${type}-contacts-radio`));
    radioButton.nativeElement.click();
    fixture.detectChanges();
  };

  const selectFirstItem = (debugElement: DebugElement, fixture: ComponentFixture<AppComponent>) => {
    const firstListItem = debugElement.query(By.css('li'));
    firstListItem.nativeElement.click();
    fixture.detectChanges();
  };

  describe('contacts list', () => {
    describe('when contact type selector is untouched', () => {
      it('should display all contacts', () => {
        const {debugElement} = createComponent();
        expect(getListItemsTexts(debugElement)).toEqual(getContactNames());
      });
    });

    describe('when selected business contacts', () => {
      it('should display only contacts of business type', () => {
        const {fixture, debugElement} = createComponent();
        changeContactsType(debugElement, fixture, ContactType.BUSINESS);
        expect(getListItemsTexts(debugElement)).toEqual(getContactNames(ContactType.BUSINESS));
      });
    });

    describe('when selected all contacts', () => {
      it('should display only contacts of all type', () => {
        const {fixture, debugElement} = createComponent();
        changeContactsType(debugElement, fixture, ContactType.BUSINESS);
        changeContactsType(debugElement, fixture, ContactType.ALL);
        expect(getListItemsTexts(debugElement)).toEqual(getContactNames(ContactType.ALL));
      });
    });

    describe('when one of list items is selected ', () => {
      it('should display a data card containing name', () => {
        const {fixture, debugElement} = createComponent();

        selectFirstItem(debugElement, fixture);

        expect(debugElement.query(By.css('.business-card-name')).nativeElement.innerText).toEqual('Anna');
      });

      it('should display a data card containing surname', () => {
        const {fixture, debugElement} = createComponent();
        selectFirstItem(debugElement, fixture);
        expect(debugElement.query(By.css('.business-card-surname')).nativeElement.innerText).toEqual('May');
      });

      it('should display a data card containing birth date', () => {
        const {fixture, debugElement} = createComponent();
        selectFirstItem(debugElement, fixture);
        expect(debugElement.query(By.css('.business-card-birth-date')).nativeElement.innerText).toEqual('1.01.1964');
      });

      it('should display a data card containing address', () => {
        const {fixture, debugElement} = createComponent();
        selectFirstItem(debugElement, fixture);
        expect(debugElement.query(By.css('.business-card-address')).nativeElement.innerText).toEqual('MainStreet 16');
      });
    });

    describe('displaying cards when changing contacts type', () => {
      describe('when a private item is selected and contacts type is changed to business', () => {
        it('should hide the card', () => {
          const {fixture, debugElement} = createComponent();

          changeContactsType(debugElement, fixture, ContactType.PRIVATE);
          selectFirstItem(debugElement, fixture);
          changeContactsType(debugElement, fixture, ContactType.BUSINESS);

          const businessCard = debugElement.query(By.css('app-business-card'));
          expect(businessCard).toBeNull();
        });
      });

      describe('when a private item is selected and contacts type is changed to all', () => {
        it('should keep displaying the card', () => {
          const {fixture, debugElement} = createComponent();

          changeContactsType(debugElement, fixture, ContactType.PRIVATE);
          selectFirstItem(debugElement, fixture);
          changeContactsType(debugElement, fixture, ContactType.ALL);

          const businessCard = debugElement.query(By.css('app-business-card'));
          expect(businessCard).not.toBeNull();
        });
      });
    });
  });
});
