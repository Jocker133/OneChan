import { Component, Input, OnInit } from '@angular/core';
import { Post } from './Post';
import { Thread } from './Thread';

@Component({
  selector: 'chan-post-detail',
  template: `
    <button (click)="displayForm()">Add a Post</button>
  `,
  styles: [
  ]
})
export class PostDetailComponent implements OnInit {
  add: boolean = false;

  post: Post = {
    id : "1", date: new Date(), img : "Votre image", message : "Votre texte", parentid: null, role: ["Anonymous"], threadHead: false
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
