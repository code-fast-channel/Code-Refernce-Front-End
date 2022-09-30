import { TestBed } from '@angular/core/testing';

import { SharedRatingService } from './shared-rating.service';

describe('SharedRatingService', () => {
  let service: SharedRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
