import { Component, OnInit } from '@angular/core';
import { Post } from './Post';
import { PostService } from './post.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'chan-post-edit',
  template: `
    <chan-post-form *ngIf="!loading" [post]="post"></chan-post-form>
  `,
  styles: [
  ]
})
export class PostEditComponent implements OnInit {
  post: Post;
  loading = true;
  arrayOfPosts: Post[] = [];
  arrayofTest: Post[] = [];

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('postId');
      const i = +params.get('i');
      this.postService.getList()
        .subscribe(post => {
          this.arrayOfPosts = post as Post[];
        });

      if (id) {
        this.postService.getList()
        .subscribe(post => {
          this.arrayofTest = post as Post[];
        });
        this.post = this.arrayofTest[i];
        console.log(this.post.message);
      }
      this.loading = false;
    });
  }

}
