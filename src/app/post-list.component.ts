import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './Post';
import { PostService } from './post.service';
import {Router} from "@angular/router";

@Component({
  selector: 'chan-post-list',
  template: `
    <button>Add a thread</button>
    <ul>
      <li *ngFor="let currentPost of post | async">
        <chan-post
              [post] = "post"
        ></chan-post>
      </li>
    </ul>
  `,
  styles: [
  ]
})
export class PostListComponent implements OnInit {
  post: Observable<Array<Post>>;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.post = this.postService.getList();
  }

  deleteContact(post: Post) {
    this.postService.delete(post);
  }

  editContact(post: Post) {
    this.router.navigate(['posts', post.id, 'edit']);
  }

  addContact() {
    this.router.navigate(['posts', 'new']);
  }

}
