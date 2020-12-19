import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PostEditComponent } from './post-edit.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostEditComponent', () => {
  let component: PostEditComponent;
  let fixture: ComponentFixture<PostEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientModule, RouterTestingModule],
      declarations: [ PostEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
