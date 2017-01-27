import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { DashboardModel } from '../Model/dashboard.model';
import { DashboardModelUser } from '../Model/dashboard.modeluq';
import { Router, RouterModule } from '@angular/router';
import { EditVisitor } from '../services/editvisitor.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard-form',
    templateUrl: './dashboard.component.html',
    providers: [DashboardService, EditVisitor]
})

export class DashboardComponent implements OnInit {

    searched_data: DashboardModel[];
    saved_datas: DashboardModel[];
    dashboardForm: FormGroup;
    useremail = localStorage.getItem("host_email");
    username = localStorage.getItem("host_name");
    constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService, private router: Router) { }

    ngOnInit() {
        this.dashboardForm = this.formBuilder.group({
            visitorname: ['', [Validators.required, Validators.minLength(6)]],
            visitoremail: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            visitorcontact: ['', [Validators.required, Validators.minLength(10)]],
        });

        var res;
        var visitoruser = {
            visitor_host: this.useremail
        }

        this.saved_datas = [];
        this.dashboardService.getSavedData(visitoruser).subscribe(saved_data => { this.saved_datas = saved_data });

    }

    addVisitor(event, visitorname, visitoremail, visitorcontact) {
        var date = new Date();
        var result;
        var visitor = {
            visitor_name: visitorname.value,
            visitor_email: visitoremail.value,
            visitor_contact: visitorcontact.value,
            visitor_indate: date.getDate() + "-" + date.getMonth() + 1 + "-" + date.getFullYear(),
            visitor_intime: new Date().toTimeString().split(" ")[0],
            visitor_outtime: "",
            visitor_host: this.useremail,
            visitor_host_name: this.username
        };

        result = this.dashboardService.setSavedData(visitor);
        result.subscribe(x => {
            this.saved_datas.unshift(visitor);
        });
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

    searchVisitor(event, search_data) {

        this.searched_data = [];
        var str1 = search_data.value.toLowerCase();

        this.saved_datas.forEach(element => {

            if (element.visitor_name.toLowerCase().search(search_data.value) == 0) {
                this.searched_data.push(element);
            }

        });

    }

    onLogOut() {

        localStorage.removeItem("host_email");
        localStorage.removeItem("host_name");

        this.router.navigate(['']);

    }

}