import { TestBed } from '@angular/core/testing';

import { SubmissionStateService } from './submission-state.service';

describe('SubmissionStateServiceService', () => {
  let service: SubmissionStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
