import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import saveAs from 'file-saver';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export default class ContactComponent {
  contact = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  });

  submitForm = () => {
    const val = this.contact.getRawValue();
    console.log(val);
    const blob = new Blob(
      [val.email ?? '', '\n', val.fullName ?? '', '\n', val.message ?? ''],
      { type: 'text/plain;charset=utf-8' }
    );
    saveAs(blob, 'save-me.txt');
  };
}
