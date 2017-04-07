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
var ng2_dragula_1 = require('ng2-dragula');
var myhttp_service_1 = require('./myhttp.service');
var SubscribeComponent = (function () {
    function SubscribeComponent(dragulaService, myHttpService) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.myHttpService = myHttpService;
        this.many = ['1'];
        this.many2 = ['1'];
        this.myHttpService.getCategories()
            .subscribe(function (data) {
            _this.many = data;
        });
        this.myHttpService.getMyCategories(JSON.parse(localStorage.getItem('profile')).user_id)
            .subscribe(function (data) {
            console.log(data[0]);
            _this.many2 = JSON.parse(data[0]);
            if (_this.many2 == ['']) {
                _this.many2 = [''];
            }
            _this.many2.forEach(function (element) {
                console.log(element + " " + _this.many.indexOf(element));
                _this.many.forEach(function (el) {
                    console.log("--" + el);
                });
                if (_this.many.indexOf(element) != -1) {
                    console.log("delete:" + _this.many.splice(_this.many.indexOf(element), 1));
                }
            });
        });
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
    }
    SubscribeComponent.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
        // do something else
    };
    SubscribeComponent.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
        // do something else
    };
    SubscribeComponent.prototype.saveMyCategories = function () {
        console.log(JSON.stringify(this.many2));
        this.myHttpService.setMyCategories(JSON.parse(localStorage.getItem('profile')).user_id, JSON.stringify(this.many2))
            .subscribe();
    };
    SubscribeComponent = __decorate([
        core_1.Component({
            selector: 'about',
            template: "\n    <div class='wrapper'>\n        <div class='col-sm-6'>\n            <h4>Categories without subscribe</h4>\n            <div [ngClass]=\"['container','col-sm-6']\" style=\"border: 4px double black; widtch: 50%;\" \n                        [dragula]='\"another-bag\"' [dragulaModel]='many'>\n                <div *ngFor='let text of many'>\n                    {{text}}\n                </div>\n            </div>\n        </div>\n        <div class='col-sm-6'>\n            <h4>Categories with subscribe</h4>\n            <div [ngClass]=\"['container','col-sm-6']\" style=\"border: 4px double black; widtch: 50%;\" \n                        [dragula]='\"another-bag\"' [dragulaModel]='many2'>\n                <div *ngFor='let text of many2'>\n                    {{text}}\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class='col-sm-12' style=\"padding-top: 10px\">\n        <button (click)=\"saveMyCategories()\">Save</button>\n    </div>\n    ",
            styleUrls: ['../node_modules/dragula/dist/dragula.css']
        }), 
        __metadata('design:paramtypes', [ng2_dragula_1.DragulaService, myhttp_service_1.MyHttpService])
    ], SubscribeComponent);
    return SubscribeComponent;
}());
exports.SubscribeComponent = SubscribeComponent;
//# sourceMappingURL=app.subscribe.component.js.map