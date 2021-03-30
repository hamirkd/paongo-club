import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitresListComponent } from './titres-list.component';

describe('TitresListComponent', () => {
  let component: TitresListComponent;
  let fixture: ComponentFixture<TitresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitresListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
