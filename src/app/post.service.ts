import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from './Post';
import { PostIdService } from './post-id.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postSubject: BehaviorSubject<Array<Post>> = new BehaviorSubject<Array<Post>>([]);
  postApiUrl = environment.apiUrl + 'posts/';

  constructor(private postIdService: PostIdService, private http: HttpClient) {
    this.http.get<Array<Post>>(this.postApiUrl)
        .subscribe(posts => {
          this.postSubject.next(posts);
        });
   }

   createNewEvent():Post {
    return {
      id: "1",
      date: new Date(),
      img: "test_image",
      message: "texte",
      parentid: null,
      role: 3,
      threadHead: false
    };
  }

  getList() {
    return this.postSubject.asObservable();
  }

  addOrModify(post: Post) {
    if (post.id) {
      this.update(post);
    } else {
      this.add(post);
    }
  }

  add(post: Post) {
    post.id = this.postIdService.get();

    this.http.post(this.postApiUrl, post)
        .subscribe(() => {
          const contactsTab = this.postSubject.getValue()
          contactsTab.push(post);

          this.postSubject.next(contactsTab);
        });
  }

  update(post: Post) {
    this.http.put(`${this.postApiUrl}/${post.id}`, post)
        .subscribe(() => {
          const contactsTab = this.postSubject.getValue()
          const index = contactsTab.findIndex(c => c.id === post.id);

          contactsTab.splice(index, 1, post);

          this.postSubject.next(contactsTab);
        });
  }

  delete(post: Post) {
    this.http.delete(`${this.postApiUrl}/${post.id}`)
        .subscribe(() => {
          const contactsTab = this.postSubject.getValue()
          const index = contactsTab.findIndex(c => c.id === post.id);

          contactsTab.splice(index, 1);

          this.postSubject.next(contactsTab);
        });
  }

  get(id: string) {
    const contactsList = this.postSubject.getValue();

    return contactsList.find(post => post.id = id);
  }
}
