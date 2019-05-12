import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  addTodoForm = this.fb.group({
    title: [],
    description: []
  });

  todos = [
    { title: 'Todo 1', description: 'Desc 1' },
    { title: 'Todo 2', description: 'Desc 2' },
    { title: 'Todo 3', description: 'Desc 3' },
    { title: 'Todo 4', description: 'Desc 4' }
  ];

  errMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  onSubmit() {
    const url = 'http://localhost:3000/validateTodo';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    const todo = {
      title: this.addTodoForm.controls['title'].value,
      description: this.addTodoForm.controls['description'].value
    };

    this.http.post(url, todo, options).subscribe(
      res => {
        console.log(res)
        this.todos.push(todo);
        this.addTodoForm.reset();
        this.errMessage = '';
      },
      err => {
        console.log(err);
        this.errMessage = err.error;
      }
    )
  }

  remove() {
    this.todos.pop();
  }

  clear() {
    this.todos = [];
  }
}