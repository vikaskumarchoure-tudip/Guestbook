import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { RegisterUser } from '../Model/register.model';
import { RegisterService } from '../services/register.service';
@Component({
    selector: 'register-form',
    templateUrl: 'app/RegisterComponent/register.component.html',
    providers: [RegisterService]
})

export class RegisterComponent implements OnInit {

    submitted = false;
    registerForm: FormGroup;
    title = "Register";
    newUsers: RegisterUser[];

    constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {

    }

    //Register component loads
    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            confpassword: ['', [Validators.required, Validators.minLength(6)]]
        });

    }

    //Register button click handler
    registerUser(event, username, email, password) {
        var result;
        this.newUsers = [];
        var newUser = {
            username: username.value.toString().trim(),
            email: email.value.toString().trim(),
            password: password.value.toString().trim(),
            role: "receptionist"
        }

        result = this.registerService.registerUser(newUser);
        result.subscribe(x => {
            this.newUsers.push(newUser);
            if (!newUser) {
                //if the data is invalid
                alert("Enter valid data");
                username.value = "";
                email.value = "";
                password.value = "";
            }
            else {
                //if the user is registered succesfully
                alert("Registered Succesfully");
            }

            username.value = "";
            email.value = "";
            password.value = "";
        });
    }

}