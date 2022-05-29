import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private baseUrl = environment.API_BASEURL;

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Todo[]>(this.baseUrl + 'getAll');
  }

  addTask(work: Todo) {
    return this.http.post(this.baseUrl + 'post',
      {
        name: work.name?.toLowerCase(),
        task: work.task
      }
    )
  }

  deleteTask(work: Todo) {
    return this.http.delete(this.baseUrl + 'delete/' + work._id);
  }

  updateTask(work: Todo) {
    return this.http.patch(this.baseUrl + 'update/' + work._id,
      {
        task: work.task
      });
  }
}
