import { Component, OnInit } from '@angular/core';
import { SavedUser } from '../saveduser';
import { DashboardService } from '../services/dashboard.service';
import { DashboardModel } from '../Model/dashboard.model';
import { DashboardModelUq } from '../Model/dashboard.modeluq';
@Component({
    moduleId: module.id,
    selector: 'dashboard-form',
    templateUrl: './dashboard.component.html',
    providers: [SavedUser, DashboardService]
})

export class DashboardComponent implements OnInit {

    saved_datas: DashboardModel[];
    ret_datas:DashboardModelUq[];

    useremail = "vikaskumar@gmail.com";
    constructor(private savedUser: SavedUser, private dashboardService: DashboardService) { }



    ngOnInit() {
        //this.user_email = this.savedUser.user_email;
        //alert(this.savedUser.users_logged);
        //console.log("User"+this.savedUser.users_logged);

        var res;
        var visitoruq = {
            visitor_host:this.useremail
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
            visitor_intime: visitorintime.value,
            visitor_outtime: visitorouttime.value,
            visitor_host: this.useremail
        };

        result = this.dashboardService.setSavedDatas(visitor);

        result.subscribe(x => {
            this.saved_datas.push(visitor);
        });
        visitorname.value = "";
        visitoremail.value = "";
        visitorcontact.value = "";
        visitorintime.value = "";
        visitorouttime.value = "";
    }

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

}