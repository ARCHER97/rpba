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
var router_2 = require('@angular/router');
var ElementDetailComponent = (function () {
    function ElementDetailComponent(myHttpService, router, route) {
        var _this = this;
        this.myHttpService = myHttpService;
        this.router = router;
        this.route = route;
        this.myHttpService.getCategories()
            .subscribe(function (data) {
            _this.categorys = data;
        });
        this.myHttpService.getItems()
            .subscribe(function (data) {
            _this.items = data;
        });
        this.route.params
            .switchMap(function (params) { return _this.myHttpService.getItem(+params['id']); })
            .subscribe(function (items) {
            _this.selectedItemId = items[0];
            console.log(_this.selectedItemId);
            _this.selectedItem = items[0];
        });
    }
    ElementDetailComponent.prototype.onSelect = function (item) {
        this.gotoDetail(item.id);
    };
    ElementDetailComponent.prototype.onSelectCategory = function (category) {
        var _this = this;
        this.selectedItemId = null;
        this.selectedCategory = category;
        if (category === 'all')
            this.myHttpService.getItems()
                .subscribe(function (data) {
                _this.items = data;
            });
        else
            this.myHttpService.getItemsWithCategory(category)
                .subscribe(function (data) {
                _this.items = data;
            });
    };
    ElementDetailComponent.prototype.deleteItem = function () {
        var _this = this;
        this.myHttpService.deleteItem(this.selectedItemId);
        var item;
        this.items.forEach(function (element) {
            if (element.id == _this.selectedItemId)
                item = element;
        });
        this.items.splice(this.items.indexOf(item), 1);
        this.selectedItemId = null;
    };
    ElementDetailComponent.prototype.compareUserItem = function () {
        if (!!JSON.parse(localStorage.getItem('profile')))
            return this.selectedItem.user_id == JSON.parse(localStorage.getItem('profile')).user_id;
        else
            return false;
    };
    ElementDetailComponent.prototype.gotoDetail = function (id) {
        this.router.navigate(['/detail', id]);
    };
    ElementDetailComponent = __decorate([
        core_1.Component({
            selector: 'element-detail',
            template: "\n    <div class=\"col-sm-2\">\n        <ul class=\"nav nav-pills nav-stacked\">\n            <li class=\"active\" (click)=\"onSelectCategory('all')\"><a>All category</a></li>\n            <li *ngFor=\"let category of categorys\" [class.selected]=\"category === selectedCategory\" \n                    (click)=\"onSelectCategory(category)\">\n                {{category}}\n            </li>\n        </ul>\n    </div>\n    <div class=\"col-sm-4\">\n        <ul class=\"items\">\n            <li *ngFor=\"let item of items\" [class.selected]=\"item.id == selectedItem.id\" (click)=\"onSelect(item)\">\n                <span class=\"badge\">{{item.id}}</span> {{item.name}}\n            </li>\n        </ul>\n    </div>\n    <div class=\"col-sm-6\">\n        <div *ngIf=\"selectedItem\">\n            <h2>{{selectedItem.name}} details!</h2>\n            <div>\n                <label>id: </label>{{selectedItem.id}}\n            </div>\n            <div>\n                <label>name: {{selectedItem.name}}</label>\n                <pre>{{selectedItem.about}}</pre>\n            </div>\n            <div>\n                <button *ngIf=\"compareUserItem()\" (click)=\"deleteItem()\">Delete item</button>\n            </div>\n        </div>\n        <div *ngIf=\"!selectedItem\">\n            <h2>SELECT ITEM</h2>\n        </div>\n    </div>\n  ",
            styleUrls: ['../app/stylefiles/app.doing.component.css']
        }), 
        __metadata('design:paramtypes', [myhttp_service_1.MyHttpService, router_1.Router, router_2.ActivatedRoute])
    ], ElementDetailComponent);
    return ElementDetailComponent;
}());
exports.ElementDetailComponent = ElementDetailComponent;
//# sourceMappingURL=app.about-element.component.js.map