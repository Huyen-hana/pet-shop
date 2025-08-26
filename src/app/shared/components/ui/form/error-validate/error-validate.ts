import { Component, Input } from '@angular/core';
import { MessageModule } from 'primeng/message';


@Component({
  selector: 'app-error-validate',
  imports: [MessageModule],
  templateUrl: './error-validate.html',
  styleUrl: './error-validate.scss'
})
export class ErrorValidate {
  @Input('control') control: any; // FormControl
  @Input('name-control') nameControl: string = '';
  
  get message() {
    for (let err in this.control.errors) {
      if (this.control.dirty || this.control.touched) {
        return this.getErrMess(err, this.control.errors[err])
      }
    }
    return null;
  }
  getErrMess(keyErr: string, value: any) {
    let messages = {
      'required': `${this.nameControl} is a required field`,
      'minlength': `Please enter at least ${value.requiredLength} characters`,
      'pattern': `${this.nameControl} must be valid`
    }
    return messages[keyErr as keyof typeof messages];
  }
}
