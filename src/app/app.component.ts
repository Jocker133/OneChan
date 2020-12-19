import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'chan-root',
  template: `
    <img src="../assets/welcome.jpg" height="350px" class="welcome" width="500px">
    <br>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
    .welcome {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent   {
  title = 'OneChan';
}
