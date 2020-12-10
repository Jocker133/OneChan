import { Component, Input, OnInit } from '@angular/core';
import { Post } from './Post';
import { Thread } from './Thread';

@Component({
  selector: 'chan-post-detail',
  template: `
    <button (click)="displayForm()">Add a Post</button>
    <chan-post-form *ngIf="add" [post]="post"></chan-post-form>
  `,
  styles: [
  ]
})
export class PostDetailComponent implements OnInit {
  add: boolean = false;

  post: Post = {
    id : "1", date: new Date(), img : "test_image", message : "texte", parentid: null, role: 3, threadHead: false
  }

  displayForm() {
    if(!this.add)
      this.add = true;
    else
      this.add = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
