import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { map, shareReplay } from 'rxjs/operators';

export class Customer {
  name: string;
  email: string;
  send = false;
  addressType = 'home';
  city = '';
  area = '';
  code = '';
  address = '';
  constructor() {}
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('city')
  cityControl: FormControl;

  customer = new Customer();

  cityarea$ = this.http.get('/assets/data/cityarea.json').pipe(shareReplay());
  city$ = this.cityarea$.pipe(map(ds => Object.keys(ds)));
  areas = [];

  constructor(private http: HttpClient) {}

  queryAreaOption(event) {
    this.cityarea$
      .pipe(
        map(
          ds =>
            !event.target.value ? [] : Object.entries(ds[event.target.value])
        )
      )
      .subscribe(options => {
        this.areas = options;
        if (options.length === 0) {
          this.customer.area = '';
          this.customer.code = '';
        }
      });
  }

  getCode(target) {
    const areaCode = this.areas.find(x => x[0] === target.value) || ['', ''];
    this.customer.code = areaCode[1];
  }

  ngOnInit() {}

  save(f: NgForm) {
    console.log(f.form.getRawValue());
  }
}
