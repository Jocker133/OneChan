import { Component, Input, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { Post } from './Post';

@Component({
  selector: 'chan-post-form',
  template: `
    <h3>Create a new post</h3>
    <form #formElement="ngForm" (ngSubmit)="onSubmit(formElement)">
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

  onSubmit(form: NgForm) {
    console.log(form.valid);
    console.log(form.value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
