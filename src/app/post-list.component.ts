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
    
    
      <mat-card *ngFor="let currentPost of pos | async; let i = index">
      <div *ngIf="currentPost.threadHead" class="head">
        <mat-card-header>
          <mat-card-title>Anonymous</mat-card-title>
          <mat-card-subtitle>{{ currentPost.date }} - {{ currentPost.id }} - role : {{ currentPost.role }}</mat-card-subtitle>
          <button mat-button class="collapse-button" *ngIf="messages(currentPost)" (click)="gestionDisplay(currentPost)">{{ signe[indexOfstring] }}</button>
        </mat-card-header>
        <mat-card-content>
          {{ currentPost.message }}
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="editContact(currentPost)">Edit</button>
          <button mat-button (click)="deleteContact2(currentPost, i)">Delete</button>
        </mat-card-actions>
        <button mat-button (click)="addContact2(i)">Add a post in this thread</button>
      </div>

      <div *ngIf="!currentPost.threadHead && !displayPosts.includes(currentPost)">
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
          <button mat-button (click)="deleteContact(currentPost, i)">Delete</button>
        </mat-card-actions>
        </div>
      </div>
      
      </mat-card>
   
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
  signe: string[] = ["-", "+"];
  indexOfstring: number = 0;
  arrayOfPost: Post[];
  index: number;
  displayPosts: Post[];
  getPosts: Post[];
  indexThread: number;
  indexPosts: number;
  arrayInsert: Post[];
  indexInsert: number;
  arrayDelete: Post[];
  

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.pos = this.postService.getList();
    this.displayPosts = []
  }

  deleteContact2(post: Post, i: number) {
    this.postService.getList()
          .subscribe(post => {
            this.arrayDelete = post as Post[]
          })
    if(this.arrayDelete[i+1] && !this.arrayDelete[i+1].threadHead) {
      var j = i
      j++
      while(this.arrayDelete[j] && !this.arrayDelete[j].threadHead) {
        this.postService.delete(this.arrayDelete[j])
        j++
      }
      this.postService.delete(this.arrayDelete[i])
    } else {
      this.postService.delete(post);
    }
  }

  deleteContact(post: Post) {
    this.postService.delete(post);
  }

  editContact(post: Post) {
    this.router.navigate(['posts', post.id, 'edit', 'true', post.threadHead]);
  }

  addContact() {
    this.router.navigate(['posts', 'new', 'true', '', '']);
  }

  addContact2(i: number) {
    var test: boolean = true
    this.postService.getList()
        .subscribe(post => {
          this.arrayInsert = post as Post[]
        })
    while(this.arrayInsert[i+1] && !this.arrayInsert[i+1].threadHead) {
      i+=1
    }
    if(this.arrayInsert[i+1] && this.arrayInsert[i+1].threadHead) {
      i+=1
      test = false
    }
    this.router.navigate(['posts', 'new', 'false', i, test]);
  }

  gestionDisplay(currentPost: Post) {
    
    this.postService.getList()
        .subscribe(post => {
          this.getPosts = post as Post[]
        })
    this.indexThread = this.getPosts.indexOf(currentPost);
    
      while(this.getPosts[this.indexThread+1] && !this.getPosts[this.indexThread+1].threadHead) {
        if(this.displayPosts.includes(this.getPosts[this.indexThread+1])) {
          this.indexPosts = this.displayPosts.indexOf(this.getPosts[this.indexThread+1])
          this.displayPosts.splice(this.indexPosts, 1)
        }
        else {
          this.displayPosts.push(this.getPosts[this.indexThread+1])
        }
        this.indexThread+=1;
      }
    
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
