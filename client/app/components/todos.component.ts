import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todo.service';
import { Todos } from '../Todos';

@Component({
    moduleId : module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html',
    providers:[TodosService]
})

export class TodosComponent implements OnInit{

    todos : Todos[];

    constructor(private todosService : TodosService){
        
    }
    
    addTodos(event,todoText){
        var result;
        var newTodo = {
            text:todoText.value,
            isCompleted:false
        }
        
        result = this.todosService.saveTodos(newTodo);
        result.subscribe(x => {
            this.todos.push(newTodo);
            todoText.value = "";
        });
    }

    ngOnInit(){
        this.todos = [];
        this.todosService.getTodos().subscribe(todos => {this.todos = todos});
    }
}