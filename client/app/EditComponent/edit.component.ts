import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { DashboardModel } from '../Model/dashboard.model';
import { Router, RouterModule } from '@angular/router';
import { EditVisitor } from '../services/editvisitor.service';

@Component({
    moduleId: module.id,
    selector: 'edit-comp',
    templateUrl: './edit.component.html',
    providers: [EditVisitor, DashboardService]
})

export class EditComponent implements OnInit {

    editForm: FormGroup;
    useremail = localStorage.getItem("current_visitor_data_host");
    username = localStorage.getItem("current_visitor_data_host_name");
    constructor(private formBuilder: FormBuilder, private dashService: DashboardService, private editService: EditVisitor, private router: Router) {
        console.log("Constructor runs");
        if (localStorage.getItem("host_email") == undefined && localStorage.getItem("host_name") == undefined) {
            this.router.navigate(['']);
        }
    }

    //edit component loads
    ngOnInit() {
        if (localStorage.getItem("host_email") == undefined && localStorage.getItem("host_name") == undefined) {
            this.router.navigate(['']);
        }

        var visitor_data_name = localStorage.getItem("current_visitor_data_name");
        var visitor_data_email = localStorage.getItem("current_visitor_data_email");
        var visitor_data_contact = localStorage.getItem("current_visitor_data_contact");
        var visitor_data_indate = localStorage.getItem("current_visitor_data_indate");
        var visitor_data_intime = localStorage.getItem("current_visitor_data_intime");
        var visitor_data_host = localStorage.getItem("current_visitor_data_host");

        this.editForm = this.formBuilder.group(
            {
                visitor_name_edit: [visitor_data_name, Validators.required],
                visitor_email_edit: [visitor_data_email, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
                visitor_contact_edit: [visitor_data_contact, Validators.required],
                visitor_indate_edit: [visitor_data_indate, Validators.required],
                visitor_intime_edit: [visitor_data_intime, Validators.required],
                visitor_outdate_edit: [new Date().getDate() + "-" + new Date().getMonth() + 1 + "-" + new Date().getFullYear(), Validators.required],
                visitor_outtime_edit: [new Date().toTimeString().split(" ")[0]]
            }
        );
    }

    //edit button click handling
    editVisitor(event, visitor_name, visitor_email, visitor_contact, visitor_indate, visitor_intime) {

        var result;
        var visitor_data = {
            visitor_name: visitor_name.value.toString().trim(),
            visitor_email: visitor_email.value.toString().trim(),
            visitor_contact: visitor_contact.value.toString().trim(),
            visitor_indate: visitor_indate.value.toString().trim(),
            visitor_intime: visitor_intime.value.toString().trim(),
            visitor_outdate: new Date().getDate() + "-" + new Date().getMonth() + 1 + "-" + new Date().getFullYear(),
            visitor_outtime: new Date().toTimeString().split(" ")[0],
            visitor_host: this.useremail,
            visitor_host_name: this.username
        };

        if (localStorage.getItem("host_email") == undefined && localStorage.getItem("host_name") == undefined) {
            alert("Please Log In to continue");
            this.router.navigate(['logincomponent']);
        }
        else {
            result = this.dashService.editSavedData(visitor_data);

            result.subscribe(x => {

            });

            //deleting all the vistor editable data
            localStorage.removeItem("current_visitor_data_host");
            localStorage.removeItem("current_visitor_data_host_name");
            localStorage.removeItem("current_visitor_data_name");
            localStorage.removeItem("current_visitor_data_email");
            localStorage.removeItem("current_visitor_data_contact");
            localStorage.removeItem("current_visitor_data_indate");
            localStorage.removeItem("current_visitor_data_intime");
            localStorage.removeItem("current_visitor_data_host");

            //navigating back to the dashboard page
            this.router.navigate(['dashboard']);
        }
    }
}