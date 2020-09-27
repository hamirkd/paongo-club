import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceCustomerComponent } from './espace-customer.component';

describe('EspaceCustomerComponent', () => {
  let component: EspaceCustomerComponent;
  let fixture: ComponentFixture<EspaceCustomerComponent>;

  beforeEach(async(() => {
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
