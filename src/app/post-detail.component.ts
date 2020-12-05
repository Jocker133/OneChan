import { Component, OnInit } from '@angular/core';
import { Thread } from './Thread';

@Component({
  selector: 'chan-post-detail',
  template: `
    <p>id = {{ test.id }}</p>
    <p>date = {{ test.date }}</p>
    <p>img = {{ test.img }}</p>
    <p>message = {{ test.message }}</p>
  `,
  styles: [
  ]
})
export class PostDetailComponent implements OnInit {

  test: Thread = {
    id : 1, date: new Date(), img : "test_image", message : "texte"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
