import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './Post';
import { PostService } from './post.service';
import {Router} from "@angular/router";
import { Injectable } from '@angular/core';
import * as post from "../../db.json";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'chan-post-list',
  template: `
    <button mat-button (click)="addContact()">Add a thread</button>
    
    
      <mat-card *ngFor="let currentPost of pos | async">
      <div *ngIf="currentPost.threadHead" class="head">
        <mat-card-header>
          <mat-card-title>Anonymous</mat-card-title>
          <mat-card-subtitle>{{ currentPost.date }} - {{ currentPost.id }} - role : {{ currentPost.role }}</mat-card-subtitle>
          <button mat-button class="collapse-button" *ngIf="currentPost.threadHead && messages(currentPost)" (click)="gestionDisplay()">{{ signe[indexOfstring] }}</button>
        </mat-card-header>
        <mat-card-content>
          {{ currentPost.message }}
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="editContact(currentPost)">Edit</button>
          <button mat-button (click)="deleteContact(currentPost)">Delete</button>
        </mat-card-actions>
        <button mat-button (click)="addContact2()">Add a post in this thread</button>
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
      background: lightgrey;
      border-radius: 25px;
    }
    .head {
      background: lightblue;
      border-radius: 25px;
    }
    .collapse-button {
      background: #F0FFFF;
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
  arrayOfPost: Post[];
  index: number;
  isHead: boolean;
  

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
    this.isHead = true;
    this.router.navigate(['posts', 'new', 'true']);
  }

  addContact2() {
    this.isHead = false;
    this.router.navigate(['posts', 'new', 'false']);
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

  messages(currentPost: Post) {
    this.postService.getList()
        .subscribe(post => {
          this.arrayOfPost = post as Post[]
        })
    this.index = this.arrayOfPost.indexOf(currentPost);
    if(this.arrayOfPost[this.index+1]) {
      if(this.arrayOfPost[this.index+1].threadHead) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }

}
