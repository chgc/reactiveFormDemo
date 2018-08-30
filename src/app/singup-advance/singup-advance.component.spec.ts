import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupAdvanceComponent } from './singup-advance.component';

describe('SingupAdvanceComponent', () => {
  let component: SingupAdvanceComponent;
  let fixture: ComponentFixture<SingupAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingupAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingupAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
