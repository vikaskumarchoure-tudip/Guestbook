import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { RegisterUser } from '../Model/register.model';
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
    newUsers: RegisterUser[];

    constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {

    }

    ngOnInit(){

        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password:['',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            confpassword: ['', [Validators.required, Validators.minLength(6)]]
        });

    }

    registerUser(event, username, email, password) {
        var result;
        this.newUsers = [];
        var newUser = {
            username: username.value,
            email: email.value,
            password: password.value
        }

        result = this.registerService.registerUser(newUser);
        result.subscribe(x => {
            this.newUsers.push(newUser);
            if(!newUser){
                alert("Enter valid data");
            }
            else{
                alert("Registered Succesfully");
            }
            
            username.value = "";
            email.value = "";
            password.value = "";
        });
    }

}