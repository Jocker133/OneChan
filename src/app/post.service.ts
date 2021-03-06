import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from './Post';
import { PostIdService } from './post-id.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postSubject: BehaviorSubject<Array<Post>> = new BehaviorSubject<Array<Post>>([]);
  postApiUrl = environment.apiUrl + 'post';
  otherIndex = -1;
  arrayDebut: Post[];
  arrayEnd: Post[];
  change = false;

  constructor(private postIdService: PostIdService, private http: HttpClient) {
    this.http.get<Array<Post>>(this.postApiUrl)
        .subscribe(posts => {
          this.postSubject.next(posts);
        });
   }

   /**
    * Crée le contenu par défaut d'un post ou d'une tête de thread
    */

   createNewEvent(): Post {
    return {
      id: null,
      date: new Date(),
      img: 'test_image',
      message: 'Un message',
      parentid: null,
      role: ['Anonymous'],
      threadHead: false
    };
  }

  getList() {
    return this.postSubject.asObservable();
  }

  addOrModify(post: Post) {
    this.change = true;
    if (post.id) {
      this.update(post);
    } else {
      this.add(post);
    }
  }

  /**
   * @param post Post à ajouter
   */

  add(post: Post) {
    post.id = this.postIdService.get();
    this.http.post(this.postApiUrl, post)
        .subscribe(() => {
          const contactsTab = this.postSubject.getValue();
          contactsTab.push(post);
          this.postSubject.next(contactsTab);
        });
  }

  /**
   * @param post Post à mettre à jour
   */

  update(post: Post) {
    this.http.put(`${this.postApiUrl}/${post.id}`, post)
        .subscribe(() => {
          const contactsTab = this.postSubject.getValue();
          const index = contactsTab.findIndex(c => c.id === post.id);
          contactsTab.splice(index, 1, post);
          this.postSubject.next(contactsTab);
        });
  }

  /**
   * @param post Post à insérer dans le thread
   * @param index Index du post à insérer
   */

  insert(post: Post, index: number) {
    post.id = this.postIdService.get();
    this.http.post(this.postApiUrl, post)
        .subscribe(() => {
          const contactsTab = this.postSubject.getValue();
          const tab = contactsTab.slice(index, contactsTab.length);
          for (let i = index; i < this.postSubject.getValue().length; i++) {
            this.delete(contactsTab[i]);
          }
          this.add(post);
          this.delete(post);
          /* tslint:disable-next-line */
          for (let j = 0; j < tab.length; j++) {
            this.add(tab[j]);
          }
          this.change = true;
        });
  }

  /**
   * @param post Post à supprimer
   */

  delete(post: Post) {
    this.http.delete(`${this.postApiUrl}/${post.id}`)
        .subscribe(() => {
          const contactsTab = this.postSubject.getValue();
          const index = contactsTab.findIndex(c => c.id === post.id);
          contactsTab.splice(index, 1);
          this.postSubject.next(contactsTab);
        });
    this.change = true;
  }

  get(id: string) {
    const contactsList = this.postSubject.getValue();
    return contactsList.find(post => post.id = id);
  }

  getChange() {
    return this.change;
  }
}
