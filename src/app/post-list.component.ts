import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './Post';
import { PostService } from './post.service';
import {Router} from "@angular/router";
import * as post from "../../db.json";

@Component({
  selector: 'chan-post-list',
  template: `
    <button (click)="addContact()">Add a thread</button>
    
    
      <mat-card *ngFor="let currentPost of pos | async">
      <div *ngIf="currentPost.threadHead">
        <mat-card-header>
          <mat-card-title>Anonymous</mat-card-title>
          <mat-card-subtitle>{{ currentPost.date }} - {{ currentPost.id }} - role : {{ currentPost.role }}</mat-card-subtitle>
          <button *ngIf="currentPost.threadHead" (click)="gestionDisplay()">{{ signe[indexOfstring] }}</button>
        </mat-card-header>
        <mat-card-content>
          {{ currentPost.message }}
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="editContact(currentPost)">Edit</button>
          <button mat-button (click)="deleteContact(currentPost)">Delete</button>
        </mat-card-actions>
        <button>Add a post in this thread</button>
      </div>

      <div *ngIf="!currentPost.threadHead && display">
        <div class="display_post">
        <mat-card-header>
          <mat-card-title>Anonymous</mat-card-title>
          <mat-card-subtitle>{{ currentPost.date }} - {{ currentPost.id }} - role : {{ currentPost.role }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          {{ currentPost.message }}
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>Answer</button>
          <button mat-button (click)="editContact(currentPost)">Edit</button>
          <button mat-button (click)="deleteContact(currentPost)">Delete</button>
        </mat-card-actions>
        </div>
      </div>
      
      </mat-card>
    
    <!--<ul>
      <li *ngFor="let currentPost of pos | async">
        <chan-post [post]="currentPost"></chan-post>
        <button (click)="editContact(currentPost)">Edit</button>
        <button (click)="deleteContact(currentPost)">Delete</button>
      </li>
    </ul>-->
  `,
  styles: [
    `
    .display_post {
      margin-left: 100px;
    }
    `
  ]
})
export class PostListComponent implements OnInit {
  pos: Observable<Array<Post>>;
  data: any = (post as any).default;
  display: boolean = true;
  signe: string[] = ["-", "+"];
  indexOfstring: number = 0;
  

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.pos = this.postService.getList();
  }

  deleteContact(post: Post) {
    this.postService.delete(post);
  }

  editContact(post: Post) {
    this.router.navigate(['posts', post.id, 'edit']);
  }

  addContact() {
    this.data.post.threadHead = false;
    this.router.navigate(['posts', 'new']);
  }

  gestionDisplay() {
    if(this.display)
      this.display = false
    else
      this.display = true
    if(this.indexOfstring == 0)
      this.indexOfstring = 1
    else
      this.indexOfstring = 0
  }

}
