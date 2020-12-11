import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './Post';
import { PostService } from './post.service';
import {Router} from "@angular/router";
import * as post from "../../db.json";

@Component({
  selector: 'chan-post-list',
  template: `
    <button (click)="addContact()">Add a post</button>
    <ul>
      <li *ngFor="let currentPost of pos | async">
        <chan-post [post]="currentPost"></chan-post>
        <button (click)="editContact(currentPost)">Edit</button>
        <button (click)="deleteContact(currentPost)">Delete</button>
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
    this.data.post.threadHead = false;
    this.router.navigate(['posts', 'new']);
  }

}
