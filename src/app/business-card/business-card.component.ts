import {Component, Input} from '@angular/core';
import {Contact} from '../model/contact';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent {
  @Input() contact: Contact;
}
