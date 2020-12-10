import { Component, Input, OnInit } from '@angular/core';
import { Post } from './Post';

@Component({
  selector: 'chan-post',
  template: `
    <p>
      {{ post.date }} - {{ post.message }} - {{ post.img }}
    </p>
  `,
  styles: [
  ]
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
