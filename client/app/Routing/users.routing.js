"use strict";
var dashboard_component_1 = require("../DashboardComponent/dashboard.component");
var login_component_1 = require("../LoginComponent/login.component");
var edit_component_1 = require("../EditComponent/edit.component");
exports.ContactRoutes = [
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'editvisitor', component: edit_component_1.EditComponent },
    { path: '', component: login_component_1.LoginComponent }
];
//# sourceMappingURL=users.routing.js.map