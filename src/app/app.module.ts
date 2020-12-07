import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostDetailComponent } from './post-detail.component';
import { PostFormComponent } from './post-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { PostsComponent } from './posts.component';
import { PostListComponent } from './post-list.component';
import { PostComponent } from './post.component';
import { PostEditComponent } from './post-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PostDetailComponent,
    PostFormComponent,
    PostsComponent,
    PostListComponent,
    PostComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
