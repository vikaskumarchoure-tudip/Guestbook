import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { DashboardModel } from '../Model/dashboard.model';
import { DashboardModelUq } from '../Model/dashboard.modeluq';
import { Router, RouterModule } from '@angular/router';
import { EditVisitor } from '../services/editvisitor.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard-form',
    templateUrl: './dashboard.component.html',
    providers: [DashboardService, EditVisitor]
})

export class DashboardComponent implements OnInit {

    saved_datas: DashboardModel[];
    ret_datas: DashboardModelUq[];
    dashboardForm: FormGroup;
    useremail = localStorage.getItem("host_email");
    username = localStorage.getItem("host_name");
    constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService, private router: Router) { }


    ngOnInit() {

        this.dashboardForm = this.formBuilder.group({
            visitorname: ['', [Validators.required, Validators.minLength(6)]],
            visitoremail: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
            visitorcontact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
            visitorindate: ['', [Validators.required,]],
            visitorintime: ['', [Validators.required]]
        });

        //this.user_email = this.savedUser.user_email;
        //alert(this.savedUser.users_logged);
        //console.log("User"+this.savedUser.users_logged);

        var res;
        var visitoruq = {
            visitor_host: this.useremail
        }

        this.saved_datas = [];
        this.dashboardService.getSavedDatas(visitoruq).subscribe(saved_data => { this.saved_datas = saved_data });

    }

    addVisitor(event, visitorname, visitoremail, visitorcontact, visitorintime, visitorouttime) {
        //console.log(visitorname.value+""+visitoremail.value+""+visitorcontact.value+""+visitorintime.value+""+visitorouttime.value);        
        var result;
        var visitor = {
            visitor_name: visitorname.value,
            visitor_email: visitoremail.value,
            visitor_contact: visitorcontact.value,
            visitor_indate: visitorintime.value,
            visitor_intime: visitorouttime.value,
            visitor_outtime: "",
            visitor_host: this.useremail,
            visitor_host_name: this.username
        };

        result = this.dashboardService.editSavedDatas(visitor);
        result.subscribe(x => {
            this.saved_datas.push(visitor);
        });
        visitorname.value = "";
        visitoremail.value = "";
        visitorcontact.value = "";
        visitorintime.value = "";
        visitorouttime.value = "";
    }

    //edit visitor
    editVisitor(saved_data) {
        //alert("yet to be done..." + saved_data._id);
        localStorage.setItem("current_visitor_data_name", saved_data.visitor_name);
        localStorage.setItem("current_visitor_data_email", saved_data.visitor_email);
        localStorage.setItem("current_visitor_data_contact", saved_data.visitor_contact);
        localStorage.setItem("current_visitor_data_indate", saved_data.visitor_indate);
        localStorage.setItem("current_visitor_data_intime", saved_data.visitor_intime);
        localStorage.setItem("current_visitor_data_host", saved_data.visitor_host);
        this.router.navigate(['editvisitor']);
    }

    //delete visitor
    deleteVisitor(saved_data) {

        var saved_datas = this.saved_datas;
        console.log(saved_data._id);

        this.dashboardService.deleteVisitor(saved_data._id).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < saved_datas.length; i++) {
                    if (saved_datas[i]._id == saved_data._id) {
                        saved_datas.splice(i, 1);
                    }
                }
            }
        });

    }

    onClickMe() {
        var data = {
            name: "Vikas"
        }
        var result = this.dashboardService.editSavedDatas(data);
    }

    onLogOut() {
        localStorage.removeItem("host_email");
        localStorage.removeItem("host_name");

        this.router.navigate(['']);

    }

}