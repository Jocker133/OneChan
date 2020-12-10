import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './Post';
import { PostService } from './post.service';
import {Router} from "@angular/router";
import * as post from "../../db.json";

@Component({
  selector: 'chan-post-list',
  template: `
    <button>Add a thread</button>
    <ul>
      <li *ngFor="let currentPost of data.post">
        <div *ngIf="currentPost.img == null">
          Error
        
        </div>
        <div *ngIf="currentPost.img != null">
        {{ currentPost.img }} - {{ currentPost.message }}
        </div>
        <!--<chan-post
              [post] = "post"
        ></chan-post>-->
      </li>
    </ul>
  `,
  styles: [
  ]
})
export class PostListComponent implements OnInit {
  pos: Observable<Array<Post>>;
  data: any = (post as any).default;

  

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.pos = this.postService.getList();
  }

  deleteContact(post: Post) {
    this.postService.delete(post);
  }

  editContact(post: Post) {
    this.router.navigate(['posts', post.id, 'edit']);
  }

  addContact() {
    this.data.post.threadHead = true;
    this.router.navigate(['posts', 'new']);
  }

}
