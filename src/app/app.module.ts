import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContactTypeSelectorComponent } from './contact-type-selector/contact-type-selector.component';
import { RolodexComponent } from './rolodex/rolodex.component';
import { ContactsService } from './contacts.service';
import { FormsModule } from '@angular/forms';
import { BusinessCardComponent } from './business-card/business-card.component';
import { contacts, contactsInjectionToken } from './contacts';

@NgModule({
  declarations: [
    AppComponent,
    ContactTypeSelectorComponent,
    RolodexComponent,
    BusinessCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [
    ContactsService,
    {
      provide: contactsInjectionToken,
      useValue: contacts,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
