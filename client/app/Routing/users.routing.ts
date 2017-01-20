import { DashboardComponent } from '../DashboardComponent/dashboard.component';
import { LoginComponent } from '../LoginComponent/login.component';

export const ContactRoutes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: LoginComponent }
];