import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientModule],
      providers: [ PostService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
