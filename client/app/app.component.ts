import { Component } from '@angular/core';
import { TodosService } from './services/todo.service';

@Component({
  moduleId : module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[TodosService]
})

export class AppComponent { }