import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from './logindata';
import { LoginUser } from '../Model/login.model';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'login-form',
    templateUrl: 'app/LoginComponent/login.component.html',
    providers: [LoginService]
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    login_model = new LoginData('', '');
    loginUsers: LoginUser[];
    submitted = false;
    logindata = '';
    user_email = '';
    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

    //Login component loads
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    //Login button click event handler
    onLogin(event, username, password) {
        var result;
        this.loginUsers = [];
        var userDetail = {
            email: username.value.toString().trim(),
            password: password.value.toString().trim(),
        }

        result = this.loginService.checkLogin(userDetail);

        result.subscribe(loginUsers => {

            this.loginUsers = loginUsers;

            if (loginUsers.toString() == "User not found") {
                alert("Please enter correct data");
                username.value = "";
                password.value = "";
            }
            else {
                localStorage.setItem('host_email', loginUsers.email);
                localStorage.setItem('host_name', loginUsers.username);
                localStorage.setItem('host_role', loginUsers.role);
                //console.log(""+loginUsers.email);
                this.router.navigate(['/dashboard']);
            }
        });
    }
}