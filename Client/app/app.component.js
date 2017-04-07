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
var angular2_jwt_1 = require('angular2-jwt');
var myhttp_service_1 = require('./myhttp.service');
var router_1 = require('@angular/router');
var AppComponent = (function () {
    function AppComponent(myHttpService, ref, router) {
        var _this = this;
        this.myHttpService = myHttpService;
        this.ref = ref;
        this.router = router;
        this.lock = new Auth0Lock("B8j2pPjGOFqeyQvOwA3DPXu2xcgsMuJN", "arturik.auth0.com");
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        ref.detach();
        setInterval(function () {
            _this.ref.detectChanges();
        }, 100);
    }
    AppComponent.prototype.login = function () {
        var _this = this;
        var self = this;
        this.lock.show(function (err, profile, id_token) {
            if (err) {
                throw new Error(err);
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
            _this.myHttpService.authMetod(JSON.parse(localStorage.getItem('profile')).user_id, JSON.parse(localStorage.getItem('profile')).email);
            console.log(_this.jwtHelper.decodeToken(id_token), _this.jwtHelper.getTokenExpirationDate(id_token), _this.jwtHelper.isTokenExpired(id_token));
        });
    };
    AppComponent.prototype.logout = function () {
        var self = this;
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.router.navigate(['/doing']);
    };
    AppComponent.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: '../app/htmlpage/app.component.html',
            styleUrls: ['../app/stylefiles/app.component.css']
        }), 
        __metadata('design:paramtypes', [myhttp_service_1.MyHttpService, core_1.ChangeDetectorRef, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map