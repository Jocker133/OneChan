import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './Post';
import { PostService } from './post.service';
import {Router} from "@angular/router";
import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'chan-post-list',
  template: `

    <button mat-button (click)="allowOrNot()" [class.unclickable]="mutlipleB">{{ arrayAllow[numberAllow] }}</button>
    <button mat-button (click)="addThreadHead()" [class.unclickable]="mutlipleB">Add a thread</button>
    <button mat-button (click)="modeMulti()">{{ multiple[mutlipleIndex] }}</button>
    <button mat-button *ngIf="mutlipleB" (click)="postsDelete()">Delete the posts</button>
    <br>
    <img *ngIf="allPosts.length == 0" src="../assets/chat_post.jpg" height="500px" width="800px" style="display: block;margin-left: auto; margin-right: auto">
      <mat-card *ngFor="let currentPost of pos | async; let i = index">
      <div *ngIf="currentPost.threadHead" class="head">
        <mat-card-header>
          <mat-card-title>{{ currentPost.role }}</mat-card-title>
          <mat-card-subtitle>Date : {{ currentPost.date }}</mat-card-subtitle>
          <button mat-button class="collapse-button" *ngIf="messages(currentPost)" (click)="gestionDisplay(currentPost)" [class.unclickable]="mutlipleB">{{ signe[indexOfstring] }}</button>
          <button mat-button *ngIf="mutlipleB" (click)="select(currentPost)" [class.selected]="selectedPost.includes(currentPost)">{{ selectArray }}</button>
        </mat-card-header>
        <mat-card-content>
          {{ currentPost.message }}
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="editPost(currentPost)" [class.unclickable]="mutlipleB">Edit</button>
          <button mat-button (click)="dialogBox(currentPost, i)" [class.unclickable]="mutlipleB">Delete</button>
        </mat-card-actions>
        <button mat-button (click)="addPost(i)" [class.unclickable]="mutlipleB">Add a post in this thread</button>
      </div>

      <div *ngIf="!currentPost.threadHead && !displayPosts.includes(currentPost)">
        <div class="display_post">
        <div [class.highlight]="currentPost.id === parentPost.id">
          <div [class.non-highlight]="leave">
        <mat-card-header>
          <mat-card-title>{{ currentPost.role }}</mat-card-title><button mat-button *ngIf="mutlipleB" (click)="select(currentPost)" [class.selected]="selectedPost.includes(currentPost)">{{ selectArray }}</button>
          <mat-card-subtitle *ngIf="currentPost.parentid != null && currentPost.parentid != '' ">This is an answer to -> <button mat-button (mouseover)="postHover(currentPost.parentid)" (mouseleave)="postLeave()">{{ currentPost.parentid }}</button></mat-card-subtitle>
          <mat-card-subtitle>Date : {{ currentPost.date }} </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          {{ currentPost.message }}
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="answerPost(i, currentPost.id)" [class.unclickable]="mutlipleB">Answer</button>
          <button mat-button (click)="editPost(currentPost)" [class.unclickable]="mutlipleB">Edit</button>
          <button mat-button (click)="dialogBox(currentPost, i)" [class.unclickable]="mutlipleB">Delete</button>
        </mat-card-actions>
</div>
</div>
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
    .image {
      max-width: 400px;
    }
    .highlight {
      border-radius: 25px;
      background: darkgrey;
    }
    .non-highlight {
      border-radius: 25px;
      background: lightgrey;
    }
    .unclickable {
      pointer-events: none;
    }
    .selected {
      background-color: dimgrey;
    }
    `
  ]
})
export class PostListComponent implements OnInit {

  /*Initialisation de toutes les variables utilisées plus tard */

  pos: Observable<Array<Post>>;
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
  arrayAnswer: Post[];
  arrayParent: Post[];
  parentPost: Post;
  leave: boolean = true
  arrayAllow: string[] = ["Delete without confirmation", "Delete with confirmation"]
  numberAllow: number = 0;
  allow: boolean = true;
  mutlipleB: boolean = false;
  mutlipleIndex: number = 0;
  selectedPost: Post[] = []
  multiple: string[] = []
  selectArray: string[] = ["Select me"]
  allPosts: Post[] = []
  audio;
  
  
  

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.pos = this.postService.getList();
    this.parentPost = this.postService.createNewEvent()
    this.parentPost.id = "";
    this.displayPosts = []
    this.multiple = ["Touch me to delete multiple posts", "Choose posts to delete"]
    this.postService.getList()
          .subscribe(post => {
            this.allPosts = post as Post[]
          })
    this.audio = new Audio("../assets/Villager_idle1.oga")
  }

  modeMulti() {
    if(!this.mutlipleB) {
      this.mutlipleIndex = 1
      this.mutlipleB = true
    } else {
      this.mutlipleB = false
      this.mutlipleIndex = 0
    }
  }

  postsDelete() {
    if(this.selectedPost.length == 0) {
      if(confirm("You have selected no posts to delete!!")) {

      }
    } else {
      for(var i = 0; i< this.selectedPost.length; i++) {
        this.deletePost(this.selectedPost[i])
      }
    }
  }

  select(post: Post) {
    if(this.selectedPost.includes(post)) {
      const index = this.selectedPost.indexOf(post)
      this.selectedPost.splice(index, 1)
    } else {
      this.selectedPost.push(post)
    }
  }

  allowOrNot() {
    if(this.numberAllow == 0) {
      this.numberAllow = 1
      this.allow = false
    } else {
      this.numberAllow = 0
      this.allow = true
    }
  }

  /**
   * Vérifie si le parentId du post réponse correspond à l'un des id des posts afficher actuellement, afin de pouvoir changer so couleur par la suite
   * @param parentid 
   */

  postHover(parentid: string){
    if(parentid != null && parentid != '') {
      this.postService.getList()
          .subscribe(post => {
            this.arrayParent = post as Post[]
          })
      for(var i = 0; i < this.arrayParent.length; i++) {
        if(parentid === this.arrayParent[i].id) {
          this.parentPost.id = parentid
          this.leave = false
        }
      }
    }
  }

  postLeave() {
    this.leave = true
  }

  dialogBox(post: Post, i: number) {
    if(!this.allow) {
      this.audio.play()
      if(confirm("Do you really want to delete this post/thread?")) {
        
        
        if(post.threadHead) {
          this.deletePostThread(post, i);
        } else {
          this.deletePost(post);
        }
      }
    } else {
      if(post.threadHead) {
        this.deletePostThread(post, i);
      } else {
        this.deletePost(post);
      }
    }
  }

  /**
   * Supprime la tête de thread ainsi que tous les posts qui font partie du même thread
   * @param post 
   * @param i 
   */

  deletePostThread(post: Post, i: number) {
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

  /**
   * 
   * @param post Post à supprimer
   */

  deletePost(post: Post) {
    this.postService.delete(post);
  }

  /**
   * 
   * @param post Edit le post ou la tête de thread
   */

  editPost(post: Post) {
    this.router.navigate(['posts', post.id, 'edit', 'true', post.threadHead]);
  }

  /**
   * Ajoute une nouvelle tête de thread
   */

  addThreadHead() {
    this.router.navigate(['posts', 'new', 'true', '', '', '']);
  }

  /**
   * Ajoute un post à la fin du thread choisit
   * @param i 
   */

  addPost(i: number) {
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
    this.router.navigate(['posts', 'new', 'false', i, test, '']);
  }

  /**
   * Répond par un post à la fin du thread où se trouve le post question
   * @param i Index du post question
   * @param id Id du post question
   */

  answerPost(i: number, id: string) {
    var bool: boolean = true
    this.postService.getList()
        .subscribe(post => {
          this.arrayAnswer = post as Post[]
        })
    while(this.arrayAnswer[i+1] && !this.arrayAnswer[i+1].threadHead) {
      i++
    }
    if(this.arrayAnswer[i+1] && this.arrayAnswer[i+1].threadHead) {
      i++
      bool = false
    }
    this.router.navigate(['posts', 'new', 'false', i, bool, id])
  }

  /**
   * Affiche ou masque les posts présents dans le thread
   * @param currentPost Tête de thread
   */

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

  /**
   * Vérifie s'il y a des posts dans le thread afin d'afficher ou non le bouton "+" (Expand) ou "-" (Collapse)
   * @param currentPost Tête de thread
   */

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
