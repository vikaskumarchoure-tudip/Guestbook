import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { RegisterU } from '../Model/register.model';
import { RegisterService } from '../services/register.service';
@Component({
    selector: 'register-form',
    templateUrl: 'app/RegisterComponent/register.component.html',
    providers: [RegisterService]
})

export class RegisterComponent implements OnInit{

    submitted = false;
    registerForm: FormGroup;
    title = "Register";
    newUsers: RegisterU[];

    constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {

    }

    ngOnInit(){

        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password:['',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            confpassword: ['', [Validators.required, Validators.minLength(6)]]
        });

    }

    registerUser(event, username, password, cpass) {
        var result;
        this.newUsers = [];
        var newTodo = {
            username: username.value,
            email: password.value,
            password: cpass.value
        }

        result = this.registerService.registerUser(newTodo);
        result.subscribe(x => {
            this.newUsers.push(newTodo);
            if(!newTodo){
                alert("Enter valid data");
            }
            else{
                alert("Registered Succesfully");
            }
            
            username.value = "";
            password.value = "";
            cpass.value = "";
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