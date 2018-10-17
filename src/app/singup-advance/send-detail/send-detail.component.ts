import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { shareReplay, map, mergeMap, tap, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'app-send-detail',
  templateUrl: './send-detail.component.html',
  styleUrls: ['./send-detail.component.css']
})
export class SendDetailComponent implements OnInit, OnDestroy {
  @Input()
  group: FormGroup;

  @Input()
  idx: number;

  destroy$ = new Subject();
  cityarea$ = this.http.get('/assets/data/cityarea.json').pipe(shareReplay());
  city$ = this.cityarea$.pipe(map(ds => Object.keys(ds)));
  areas$;
  constructor(private http: HttpClient) {}

  setCityChange() {
    this.areas$ = this.group.get('city').valueChanges.pipe(
      mergeMap((v: string) =>
        this.cityarea$.pipe(map(ds => (!v ? [] : Object.entries(ds[v]))))
      ),
      tap((options: any[]) => {
        if (options.length === 0) {
          this.group.patchValue({
            area: '',
            code: ''
          });
        }
      }),
      shareReplay()
    );
  }

  setAreaChange() {
    combineLatest(this.group.get('area').valueChanges, this.areas$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([areaValue, areaOptions]) => {
        const areaCode = areaOptions.find(x => x[0] === areaValue) || ['', ''];
        this.group.patchValue({
          code: areaCode[1]
        });
      });
  }

  ngOnInit() {
    this.setCityChange();
    this.setAreaChange();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
