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
var core_1 = require('@angular/core');
var myhttp_service_1 = require('./myhttp.service');
var router_1 = require('@angular/router');
var AddingItemComponent = (function () {
    function AddingItemComponent(myHttpService, router) {
        var _this = this;
        this.myHttpService = myHttpService;
        this.router = router;
        this.category = null;
        myHttpService.getCategories()
            .subscribe(function (categories) {
            _this.categories = categories;
        });
    }
    AddingItemComponent.prototype.addItem = function () {
        var _this = this;
        //^[a-zA-Z0-9]+$
        console.log(this.name, this.about, this.category, this.price);
        this.myHttpService.addItem(this.name, this.about, this.category, this.price, JSON.parse(localStorage.getItem('profile')).user_id);
        setTimeout(function () {
            _this.router.navigate(['/doing']);
        }, 100);
    };
    AddingItemComponent = __decorate([
        core_1.Component({
            selector: 'about',
            template: "\n    <div class=\"col-sm-12\">\n        <div class=\"col-sm-12\">\n            <div class=\"col-sm-3\">\n                name:\n            </div> \n            <div class=\"col-sm-9\">\n                <input [(ngModel)]=\"name\" class=\"col-sm-4\"/>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"col-sm-3\">\n                about:\n            </div>\n            <div class=\"col-sm-9\">\n                <input [(ngModel)]=\"about\" class=\"col-sm-4\"/>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"col-sm-3\">\n                category: \n            </div>\n            <div class=\"col-sm-9\">\n                <select [(ngModel)]=\"category\" class=\"col-sm-4\">\n                    <option *ngFor=\"let c of categories\" [ngValue]=\"c\">{{c}}</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"col-sm-12\">\n            <div class=\"col-sm-3\">\n                price: \n            </div>\n            <div class='col-sm-9'>\n                <input name=\"phone\" [(ngModel)]=\"price\" class=\"col-sm-4\" #phone=\"ngModel\"\n                required pattern=\"^[0-9]+$\" />\n            </div>\n        </div>\n        <div class=\"col-sm-12\" >\n            <button [disabled]=\"phone.invalid\" \n                (click)=\"addItem()\">Add item</button>\n        </div>\n    </div>\n    ",
            styleUrls: ['../app/stylefiles/app.addingitem.component.css']
        }), 
        __metadata('design:paramtypes', [myhttp_service_1.MyHttpService, router_1.Router])
    ], AddingItemComponent);
    return AddingItemComponent;
}());
exports.AddingItemComponent = AddingItemComponent;
//# sourceMappingURL=app.addingitem.component.js.map