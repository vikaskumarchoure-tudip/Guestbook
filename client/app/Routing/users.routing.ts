import { DashboardComponent } from '../DashboardComponent/dashboard.component';
import { LoginComponent } from '../LoginComponent/login.component';
import { EditComponent } from '../EditComponent/edit.component';

export const ContactRoutes = [
  { path: 'dashboard', component: DashboardComponent },
  { path : 'editcomponent', component: EditComponent },
  { path: '', component: LoginComponent }
];