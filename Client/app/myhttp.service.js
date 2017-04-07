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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var item_1 = require('./classes/item');
require('rxjs/Rx');
var MyHttpService = (function () {
    function MyHttpService(http) {
        this.http = http;
        this.serverUrl = 'http://localhost:8888/'; // URL to web API
    }
    MyHttpService.prototype.authMetod = function (id, login) {
        var body = JSON.stringify({ id: id, login: login });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(this.serverUrl + "user/auth");
        this.http.post(this.serverUrl + "user/auth", body, options)
            .subscribe();
    };
    MyHttpService.prototype.getCategories = function () {
        return this.http.get(this.serverUrl + "category/getcategories")
            .map(this.extractDataCategory)
            .catch(this.handleError);
    };
    MyHttpService.prototype.getMyCategories = function (id) {
        var body = JSON.stringify({ id: id });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.serverUrl + "category/getmycategories", body, options)
            .map(this.extractDataMyCategory);
    };
    MyHttpService.prototype.setMyCategories = function (id, categories) {
        var body = JSON.stringify({ id: id, categories: categories });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.serverUrl + "category/setmycategories", body, options);
    };
    MyHttpService.prototype.getItems = function () {
        return this.http.get(this.serverUrl + "item/getitems")
            .map(this.extractDataItem)
            .catch(this.handleError);
    };
    MyHttpService.prototype.getItem = function (id) {
        return this.http.get(this.serverUrl + "item/getitem?id=" + id)
            .map(this.extractDataItem)
            .catch(this.handleError);
    };
    MyHttpService.prototype.getItemsWithCategory = function (category) {
        var body = JSON.stringify({ category: category });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.serverUrl + "item/getitemswithcategory", body, options)
            .map(this.extractDataItem);
    };
    MyHttpService.prototype.addItem = function (name, about, category, price, user_id) {
        var body = JSON.stringify({ name: name, about: about, category: category, price: price, user_id: user_id });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.serverUrl + "item/additem", body, options)
            .subscribe();
    };
    MyHttpService.prototype.deleteItem = function (id) {
        var body = JSON.stringify({ id: id });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.serverUrl + "item/deleteitem", body, options)
            .subscribe();
    };
    MyHttpService.prototype.extractDataCategory = function (res) {
        var body = res.json();
        var resultArray = new Array();
        for (var i = 0; i < res.json().length; i++) {
            resultArray.push(res.json()[i].category);
        }
        return resultArray;
    };
    MyHttpService.prototype.extractDataMyCategory = function (res) {
        var body = res.json();
        var resultArray = new Array();
        for (var i = 0; i < res.json().length; i++) {
            resultArray.push(res.json()[i].body);
        }
        return resultArray;
    };
    MyHttpService.prototype.extractDataItem = function (res) {
        var body = res.json();
        var resultArray = new Array();
        for (var i = 0; i < res.json().length; i++) {
            resultArray.push(new item_1.Item(res.json()[i].id, res.json()[i].name, res.json()[i].about, res.json()[i].price, res.json()[i].user_id));
        }
        return resultArray;
    };
    MyHttpService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    MyHttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MyHttpService);
    return MyHttpService;
}());
exports.MyHttpService = MyHttpService;
//# sourceMappingURL=myhttp.service.js.map