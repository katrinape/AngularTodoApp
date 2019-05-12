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
    { title: 'Wymiana opon', description: 'Mechanik ma czas o 18' },
    { title: 'Wizyta u fryzjera', description: 'Godz. 13' }
  ];

  errMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  onSubmit() {
    const url = 'http://localhost:5000/validateTodo';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    const todo = {
      title: this.addTodoForm.controls['title'].value,
      description: this.addTodoForm.controls['description'].value
    };

    this.http.post(url, todo, { ...options, responseType: 'text' }).subscribe(
      res => {
        console.log(res);
        this.todos.push(todo);
        this.addTodoForm.reset();
        this.errMessage = '';
      },
      err => {
        console.log('Error: ', err);
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