import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreAddComponent } from './titre-add.component';

describe('TitreAddComponent', () => {
  let component: TitreAddComponent;
  let fixture: ComponentFixture<TitreAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitreAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitreAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
