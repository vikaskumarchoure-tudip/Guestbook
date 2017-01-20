"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var todo_service_1 = require("../services/todo.service");
var TodosComponent = (function () {
    function TodosComponent(todosService) {
        this.todosService = todosService;
    }
    TodosComponent.prototype.addTodos = function (event, todoText) {
        var _this = this;
        var result;
        var newTodo = {
            text: todoText.value,
            isCompleted: false
        };
        result = this.todosService.saveTodos(newTodo);
        result.subscribe(function (x) {
            _this.todos.push(newTodo);
            todoText.value = "";
        });
    };
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todos = [];
        this.todosService.getTodos().subscribe(function (todos) { _this.todos = todos; });
    };
    return TodosComponent;
}());
TodosComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'todos',
        templateUrl: 'todos.component.html',
        providers: [todo_service_1.TodosService]
    }),
    __metadata("design:paramtypes", [todo_service_1.TodosService])
], TodosComponent);
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map