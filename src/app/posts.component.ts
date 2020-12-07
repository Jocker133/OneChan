import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chan-posts',
  template: `
    <header><h1>OneChan</h1></header>
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
