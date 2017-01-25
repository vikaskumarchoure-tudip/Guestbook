import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './LoginComponent/login.component';
import { RegisterComponent } from './RegisterComponent/register.component';
import { ContactRoutes } from './Routing/users.routing';
import { DashboardComponent } from './DashboardComponent/dashboard.component';
import { EditComponent } from './EditComponent/edit.component';

@NgModule({
  imports: [BrowserModule, HttpModule, BrowserModule, FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(ContactRoutes)
  ],
  declarations: [AppComponent, LoginComponent, RegisterComponent, DashboardComponent,EditComponent],
  bootstrap: [AppComponent],

})

export class AppModule { }