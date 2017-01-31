import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '../Model/login.model';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'login-form',
    templateUrl: 'app/LoginComponent/login.component.html',
    providers: [LoginService]
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginUsers: LoginUser[];
    submitted = false;
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

        if (username.value == '' && password.value == '') {
            var x = document.getElementById("snackbar");
            x.className = "show";
            x.style.background = "#EF5350";
            x.innerHTML = "Please Enter valid details...";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }
        else {

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
                    //this.login_success = false;
                    //alert("Please enter correct data");
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    x.style.background = "#EF5350";
                    x.innerHTML = "Please enter valid username and password";
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                    username.value = "";
                    password.value = "";
                }
                else {
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    x.style.background = "green";
                    x.innerHTML = "Login Successfull...";
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

                    localStorage.setItem('host_email', loginUsers.email);
                    localStorage.setItem('host_name', loginUsers.username);
                    localStorage.setItem('host_role', loginUsers.role);
                    this.router.navigate(['/dashboard']);
                }
            });
        }
    }
}