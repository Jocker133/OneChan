import { Injectable } from '@angular/core';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PostIdService {

  constructor() { }

  get() {
    return v4();
  }
}
