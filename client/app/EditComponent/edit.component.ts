import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { DashboardModel } from '../Model/dashboard.model';
import { Router, RouterModule } from '@angular/router';


@Component({
    selector: 'edit-comp',
    templateUrl: './app/EditComponent/edit.component.html',
    providers: [DashboardService]
})

export class EditComponent implements OnInit {

    editForm: FormGroup;
    username = localStorage.getItem("host_email");
    constructor(private formBuilder: FormBuilder, private dashService: DashboardService, private router: Router) { }

    ngOnInit() {
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
                visitor_indate_edit: [visitor_data_indate],
                visitor_intime_edit: [visitor_data_intime, Validators.required],
                visitor_outtime_edit: ['', Validators.required]

            }
        );
    }

    editVisitor(event, visitor_name, visitor_email, visitor_contact, visitor_indate, visitor_intime, visitor_outtime) {
        //console.log(visitor_name.value+visitor_email.value+visitor_contact.value+visitor_intime.value+visitor_outtime.value);

        var result;
        var visitor_data = {
            visitor_name: visitor_name.value,
            visitor_email: visitor_email.value,
            visitor_contact: visitor_contact.value,
            visitor_indate: visitor_indate.value,
            visitor_intime: visitor_intime.value,
            visitor_outtime: visitor_outtime.value,
            visitor_host: this.username
        };

        result = this.dashService.editSavedDatas(visitor_data);
        localStorage.removeItem("current_visitor_data_name");
        localStorage.removeItem("current_visitor_data_email");
        localStorage.removeItem("current_visitor_data_contact");
        localStorage.removeItem("current_visitor_data_indate");
        localStorage.removeItem("current_visitor_data_intime");
        localStorage.removeItem("current_visitor_data_host");

        //console.log(visitor_name.value+","+visitor_email.value+","+visitor_contact.value+","+visitor_indate.value+","+visitor_intime.value+","+visitor_outtime.value);
        this.router.navigate(['dashboard']);
    }
}