import { Component, Input, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { Post } from './Post';
import * as posts from '../../db.json';
import { PostService } from './post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'chan-post-form',
  template: `
    <h3>Create a new post</h3>
    <form #formElement="ngForm" (ngSubmit)="modify(formElement)">
      <label>Image:
        <input *ngIf="post.threadHead == true" type="file" name="image" [(ngModel)]="post.img" required>
        <input *ngIf="post.threadHead == false"name="image" [(ngModel)]="post.img">
      </label>
      <label>Message:
        <input name="message" [(ngModel)]="post.message" required>
      </label>
      <input type="submit" value="{{ createMode ? 'New One' : 'Modify' }}">
      <button type="button" routerLink="/">Back</button>
    </form>
  `,
  styles: [
  ]
})
export class PostFormComponent implements OnInit {
  @Input() post: Post;
  //data: any = (posts as any).default;
  createMode = false

  /*onSubmit(form: NgForm) {
    this.post.date = new Date();
    this.post.parentid = null;
    this.post.role = 3;
    this.post.threadHead = false;
    this.post.id = "3";
    this.data.post.push(this.post);
  }*/

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    if (!this.post) {
      this.post = this.postService.createNewEvent();
      this.createMode = true;
    }
  }

  modify(formElement: NgForm) {
      this.postService.addOrModify(this.post);
      this.router.navigate(['/']);
  }
}
