import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDetailComponent } from './send-detail.component';

describe('SendDetailComponent', () => {
  let component: SendDetailComponent;
  let fixture: ComponentFixture<SendDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
