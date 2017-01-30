import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { DashboardModel } from '../Model/dashboard.model';
import { DashboardModelUser } from '../Model/dashboard.modeluq';
import { ReceptionistModel } from '../Model/receptionist.model';
import { Router, RouterModule } from '@angular/router';
import { EditVisitor } from '../services/editvisitor.service';
import { RegisterService } from '../services/register.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard-form',
    templateUrl: './dashboard.component.html',
    providers: [DashboardService, EditVisitor, RegisterService]
})

export class DashboardComponent implements OnInit {

    searched_data: DashboardModel[];
    saved_datas: DashboardModel[];

    receptionist_str: ReceptionistModel[];
    ReceptionistArr = [];

    dashboardForm: FormGroup;
    search_modal = false;
    addForm: FormGroup;
    is_admin = false;
    useremail = localStorage.getItem("host_email");
    username = localStorage.getItem("host_name");
    userrole = localStorage.getItem("host_role");
    constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService, private router: Router, private registerService: RegisterService) { }


    ngOnInit() {

        if (localStorage.getItem("host_email") == undefined && localStorage.getItem("host_name") == undefined) {
            this.router.navigate(['']);
        }

        if (this.userrole == "admin") {
            this.is_admin = true;
        }
        else {
            this.is_admin = false;
        }

        this.addForm = this.formBuilder.group({
            useraddname: ['', [Validators.required, Validators.minLength(6), Validators.pattern("[a-zA-Z ]{3,20}")]],
            useraddemail: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            useraddpassword: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.dashboardForm = this.formBuilder.group({
            visitorname: ['', [Validators.required, Validators.minLength(6), Validators.pattern("[a-zA-Z ]{3,20}")]],
            visitoremail: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            visitorcontact: ['', [Validators.required, Validators.minLength(10), Validators.pattern("[1-9][0-9]{9}")]],
        });

        var res;
        var visitoruser = {
            visitor_host: this.useremail,
            visitor_role: this.userrole
        }

        this.saved_datas = [];
        this.dashboardService.getSavedData(visitoruser).
            subscribe(saved_data => {
                this.saved_datas = saved_data

            });
    }

    //add visitor
    addVisitor(event, visitorname, visitoremail, visitorcontact) {
        var date = new Date();
        var result;
        var visitor = {
            visitor_name: visitorname.value.toString().trim(),
            visitor_email: visitoremail.value.toString().trim(),
            visitor_contact: visitorcontact.value.toString().trim(),
            visitor_indate: date.getDate() + "-" + date.getMonth() + 1 + "-" + date.getFullYear(),
            visitor_intime: new Date().toTimeString().split(" ")[0],
            visitor_outtime: "",
            visitor_host: this.useremail,
            visitor_host_name: this.username
        };

        if (localStorage.getItem("host_email") == undefined && localStorage.getItem("host_name") == undefined) {
            this.router.navigate(['']);
        }
        else {
            result = this.dashboardService.setSavedData(visitor);
            result.subscribe(x => {
                this.saved_datas.unshift(visitor);
            });

            var newarr = [];
            newarr = this.saved_datas.sort();
            console.log(newarr[0]);
            //for (var i = 0; i < this.saved_datas.length; i++) {         }
        }
        visitorname.value = "";
        visitoremail.value = "";
        visitorcontact.value = "";
    }

    //edit visitor
    editVisitor(saved_data) {

        localStorage.setItem("current_visitor_data_name", saved_data.visitor_name);
        localStorage.setItem("current_visitor_data_email", saved_data.visitor_email);
        localStorage.setItem("current_visitor_data_contact", saved_data.visitor_contact);
        localStorage.setItem("current_visitor_data_indate", saved_data.visitor_indate);
        localStorage.setItem("current_visitor_data_intime", saved_data.visitor_intime);
        localStorage.setItem("current_visitor_data_host", saved_data.visitor_host);
        localStorage.setItem("current_visitor_data_host_name", saved_data.visitor_host_name);
        localStorage.setItem("logged", "YES");
        this.router.navigate(['editvisitor']);
    }

    //delete visitor
    deleteVisitor(saved_data) {

        var saved_data_all = this.saved_datas;
        console.log(saved_data._id);

        this.dashboardService.deleteVisitor(saved_data._id).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < saved_data_all.length; i++) {
                    if (saved_data_all[i]._id == saved_data._id) {
                        saved_data_all.splice(i, 1);
                    }
                }
            }
        });

    }

    //search visitor
    searchVisitor(event, search_data) {
        this.searched_data = [];

        var str1 = search_data.value.toString().toLowerCase().trim();

        if (str1.length > 0) {

            this.saved_datas.forEach(element => {

                var str2 = element.visitor_name.toString().toLowerCase().trim();

                if (str2.search(str1) != -1) {
                    this.searched_data.push(element);
                }

            });

        }


        if (this.searched_data.length != 0) {
            this.search_modal = true;
        }
        else {
            this.search_modal = false;
        }

    }

    addUser(event, username, useremail, userrole, userpassword) {

        //console.log(username.value + "," + useremail.value + "," + userpassword.value +","+userrole.value);

        var result;

        var addUser = {
            username: username.value.toString().trim(),
            email: useremail.value.toString().trim(),
            password: userpassword.value.toString().trim(),
            role: userrole.value
        }

        result = this.registerService.registerUser(addUser);
        result.subscribe(x => {
            console.log(x);
            alert("User added Successfully");
            username.value = "";
            useremail.value = "";
            userpassword.value = "";
        }
        );
    }

    //Log Out receptionist
    onLogOut() {

        localStorage.removeItem("host_email");
        localStorage.removeItem("host_name");
        localStorage.removeItem("host_role");
        localStorage.removeItem("logged");
        this.router.navigate(['']);
    }

}