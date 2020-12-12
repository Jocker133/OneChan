import { Component, Input, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { Post } from './Post';
import * as posts from '../../db.json';
import { PostService } from './post.service';
import { ActivatedRoute, Router , ParamMap} from '@angular/router';
import { PostListComponent } from './post-list.component';

@Component({
  selector: 'chan-post-form',
  template: `
    <h3>Create a new post</h3>
    <form #formElement="ngForm" (ngSubmit)="modify(formElement)">
      <label>Image:
        <input name="image" [(ngModel)]="post.img">
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
  createMode = false


  constructor(private postService: PostService, private router: Router, private postList: PostListComponent, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.post) {
      this.post = this.postService.createNewEvent();
      this.createMode = true;
    }
  }

  modify(formElement: NgForm) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        const isHead = params.get('isHead');
        if(isHead == 'true')
          this.post.threadHead = true;
        if(isHead == 'false')
          this.post.threadHead = false;
      })
      this.postService.addOrModify(this.post);
      this.router.navigate(['/']);
  }
}
