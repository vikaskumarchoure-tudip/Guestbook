import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { RegisterU } from '../Model/register.model';
import { RegisterService } from '../services/register.service';
@Component({
    selector: 'register-form',
    templateUrl: 'app/RegisterComponent/register.component.html',
    providers:[RegisterService]
})

export class RegisterComponent{

    submitted = false;
    registerForm: FormGroup;
    title = "Register";
    newUsers: RegisterU[];

    constructor(private registerService : RegisterService){

    }

    registerUser(event,username,password,cpass){
        var result;
        var newTodo = {
            username:username.value,
            email:password.value,
            password:cpass.value
        }
        
        result = this.registerService.registerUser(newTodo);
        result.subscribe(x => {
            this.newUsers.push(newTodo);
        });
    }

    /*
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
     */
}