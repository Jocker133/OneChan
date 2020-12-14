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
  createMode = false;
  arrayPosts: Post[];


  constructor(private postService: PostService, private router: Router, private postList: PostListComponent, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.post) {
      this.post = this.postService.createNewEvent();
      this.createMode = true;
    }
  }

  modify(formElement: NgForm) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        const isHead = params.get('isHead') == 'true';
        const last = params.get('last') == 'true';
        const edit = params.get('edit') == 'true';
        const head = params.get('head') == 'true'
        if(this.post.id) {
          this.post.threadHead = head
          this.postService.addOrModify(this.post);
        } else {
          this.post.threadHead = isHead;
          if(isHead) {
            this.postService.addOrModify(this.post);
          } else {
            const index = params.get('index');
            const realIndex = +index
            if(last) {
              this.postService.addOrModify(this.post);
            } else {
              this.postService.insert(this.post, realIndex);
            }
          }
        
      }
      })
      
      this.router.navigate(['/']);
  }
}
