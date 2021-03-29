import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMoneyAddComponent } from './my-money-add.component';

describe('MyMoneyAddComponent', () => {
  let component: MyMoneyAddComponent;
  let fixture: ComponentFixture<MyMoneyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMoneyAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMoneyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
