import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

function CheckEmail(c: AbstractControl): { [key: string]: boolean } | null {
  const emailContorl = c.get('email');
  const confirmEmailControl = c.get('confirmEmail');

  if (emailContorl.pristine || confirmEmailControl.pristine) {
    return null;
  }

  if (emailContorl.value === confirmEmailControl.value) {
    return null;
  }
  return { notMatch: true };
}

@Component({
  selector: 'app-singup-advance',
  templateUrl: './singup-advance.component.html',
  styleUrls: ['./singup-advance.component.css']
})
export class SingupAdvanceComponent implements OnInit {
  formData: FormGroup;

  constructor(private fb: FormBuilder) {}

  emailValidatorsRule = [
    Validators.required,
    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}')
  ];

  ngOnInit() {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      validEmail: this.fb.group(
        {
          email: ['', [...this.emailValidatorsRule]],
          confirmEmail: ['', [...this.emailValidatorsRule]]
        },
        { validator: CheckEmail }
      ),
      cellphone: ['', []],
      notify: 'email',
      send: false,
      sendList: this.fb.array([this.buildSendList()])
    });

    this.watchNotify();
  }
  watchNotify(): any {
    this.formData
      .get('notify')
      .valueChanges.subscribe(value => this.setNotification(value));
  }

  setNotification(notifyVia) {
    const cellphoneControl = this.formData.get('cellphone');
    if (notifyVia === 'text') {
      cellphoneControl.setValidators(Validators.required);
    } else {
      cellphoneControl.clearValidators();
    }
    cellphoneControl.updateValueAndValidity();
  }

  get emailControl() {
    return this.formData.get('validEmail.email');
  }

  get confirmEmailControl() {
    return this.formData.get('validEmail.confirmEmail');
  }

  appendAddress() {
    this.sendListArray.push(this.buildSendList());
  }

  remove(idx) {
    this.sendListArray.removeAt(idx);
  }

  buildSendList() {
    const formGroup = this.fb.group({
      addressType: 'home',
      city: '',
      area: '',
      code: '',
      address: ''
    });

    return formGroup;
  }

  get sendListArray(): FormArray {
    return this.formData.get('sendList') as FormArray;
  }
}
