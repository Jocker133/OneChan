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
      <label>Message:
        <input name="message" [(ngModel)]="post.message" required>
      </label>
      <label>Role:
        <select name="role" [(ngModel)]="post.role">
          <option *ngFor="let choice of array">
              {{ choice }}
          </option>
        </select>
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
  array: string[] = ["Anonymous", "Modérateur", "Administrateur"];

  constructor(private postService: PostService, private router: Router, private postList: PostListComponent, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.post) {
      this.post = this.postService.createNewEvent();
      this.createMode = true;
    }
  }

  /**
   * Gère l'ajout et l'insertion de posts et tête de thread
   * @param formElement 
   */

  modify(formElement: NgForm) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        const isHead = params.get('isHead') == 'true';
        const last = params.get('last') == 'true';
        const edit = params.get('edit') == 'true';
        const head = params.get('head') == 'true';
        const id = params.get('id');
        if(this.post.id) {
          this.post.threadHead = head
          this.postService.addOrModify(this.post);
        } else {
          this.post.threadHead = isHead;
          if(isHead) {
            this.postService.addOrModify(this.post);
          } else {
            const index = params.get('index');
            const realIndex = +index;
            this.post.parentid = id;
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
