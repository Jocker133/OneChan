import { Component, Input, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { Post } from './Post';
import * as posts from '../../db.json';

@Component({
  selector: 'chan-post-form',
  template: `
    <h3>Create a new post</h3>
    <form #formElement="ngForm" (ngSubmit)="onSubmit(formElement)">
      <label>Image:
        <input *ngIf="post.threadHead == true" type="file" name="image" [(ngModel)]="post.img" required>
        <input *ngIf="post.threadHead == false"name="image" [(ngModel)]="post.img">
      </label>
      <label>Message:
        <input name="message" [(ngModel)]="post.message" required>
      </label>
      <button>Add Post</button>
    </form>
  `,
  styles: [
  ]
})
export class PostFormComponent implements OnInit {
  @Input() post: Post;
  data: any = (posts as any).default;

  onSubmit(form: NgForm) {
    this.post.date = new Date();
    this.post.parentid = null;
    this.post.role = 3;
    this.post.threadHead = false;
    this.post.id = "3";
    this.data.post.push(this.post);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
