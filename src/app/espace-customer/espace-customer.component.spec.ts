import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EspaceCustomerComponent } from './espace-customer.component';

describe('EspaceCustomerComponent', () => {
  let component: EspaceCustomerComponent;
  let fixture: ComponentFixture<EspaceCustomerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
