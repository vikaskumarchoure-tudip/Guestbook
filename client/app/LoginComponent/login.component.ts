import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from './logindata';
import { LoginU } from '../Model/login.model';
import { LoginService } from '../services/login.service';
import { SavedUser } from '../saveduser';

@Component({
    selector: 'login-form',
    templateUrl: 'app/LoginComponent/login.component.html',
    providers: [LoginService, SavedUser]
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    login_model = new LoginData('', '');
    loginUsers: LoginU[];
    submitted = false;
    logindata = '';
    user_email = '';
    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private savedUser : SavedUser, private router : Router) { }

    ngOnInit(){
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    
    onLogin(event, username, password) {
        var result;
        this.loginUsers=[];
        var newTodo = {
            email: username.value,
            password: password.value
        }
        
        result = this.loginService.checkLogin(newTodo);
        
        result.subscribe(loginUsers => {
            
            this.loginUsers = loginUsers;
            if(loginUsers == null){
                alert("Please enter correct data");
                username.value = "";
                password.value = "";
            }
            else{
                this.savedUser.users_logged = ""+loginUsers.text;

                this.router.navigate(['dashboard']);
            }
        });
    }
    
}