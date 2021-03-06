import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent} from './post-list.component';
import { PostEditComponent} from './post-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'posts' },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/new/:isHead/:index/:last/:id', component: PostEditComponent },
  { path: 'posts/:postId/edit/:edit/:head/:i', component: PostEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
