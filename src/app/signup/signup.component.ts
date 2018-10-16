import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, shareReplay, mergeMap, tap, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  formData;

  cityarea$ = this.http.get('/assets/data/cityarea.json').pipe(shareReplay());
  city$ = this.cityarea$.pipe(map(ds => Object.keys(ds)));
  areas$;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  setCityChange() {
    this.areas$ = this.formData.get('city').valueChanges.pipe(
      mergeMap((v: string) =>
        this.cityarea$.pipe(map(ds => (!v ? [] : Object.entries(ds[v]))))
      ),
      tap((options: any[]) => {
        if (options.length === 0) {
          this.formData.patchValue({
            area: '',
            code: ''
          });
        }
      }),
      shareReplay()
    );
  }

  setAreaChange() {
    combineLatest(this.formData.get('area').valueChanges, this.areas$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([areaValue, areaOptions]) => {
        const areaCode = areaOptions.find(x => x[0] === areaValue) || ['', ''];
        this.formData.patchValue({
          code: areaCode[1]
        });
      });
  }

  ngOnInit() {
    this.formData = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}')
        ]
      ],
      send: false,
      addressType: 'home',
      city: '',
      area: '',
      code: '',
      address: ''
    });

    this.setCityChange();
    this.setAreaChange();
  }

  get nameControl() {
    return this.formData.get('name');
  }

  get emailControl() {
    return this.formData.get('email');
  }

  save() {
    console.log(this.formData.getRawValue());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
