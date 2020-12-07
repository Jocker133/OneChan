import { TestBed } from '@angular/core/testing';

import { PostIdService } from './post-id.service';

describe('PostIdService', () => {
  let service: PostIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
