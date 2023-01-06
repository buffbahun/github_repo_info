import { TestBed } from '@angular/core/testing';

import { RepoFetchService } from './repo-fetch.service';

describe('RepoFetchService', () => {
  let service: RepoFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepoFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
