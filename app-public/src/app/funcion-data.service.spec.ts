import { TestBed } from '@angular/core/testing';

import { FuncionDataService } from './funcion-data.service';

describe('FuncionDataService', () => {
  let service: FuncionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
