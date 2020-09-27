import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMoneyComponent } from './my-money.component';

describe('MyMoneyComponent', () => {
  let component: MyMoneyComponent;
  let fixture: ComponentFixture<MyMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
