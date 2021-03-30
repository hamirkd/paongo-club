import { TestBed } from '@angular/core/testing';

import { TitreModelService } from './titre-model.service';

describe('TitreModelService', () => {
  let service: TitreModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitreModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
