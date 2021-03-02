import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTitresComponent } from './my-titres.component';

describe('MyTitresComponent', () => {
  let component: MyTitresComponent;
  let fixture: ComponentFixture<MyTitresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTitresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTitresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
