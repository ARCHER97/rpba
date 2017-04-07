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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var ng2_dragula_1 = require('ng2-dragula');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_doing_component_1 = require('./app.doing.component');
var app_about_component_1 = require('./app.about.component');
var app_addingitem_component_1 = require('./app.addingitem.component');
var app_subscribe_component_1 = require('./app.subscribe.component');
var app_about_element_component_1 = require('./app.about-element.component');
var myhttp_service_1 = require('./myhttp.service');
var routes = [
    { path: '', redirectTo: 'doing', pathMatch: 'full' },
    { path: 'doing', component: app_doing_component_1.DoingComponent },
    { path: 'about', component: app_about_component_1.AboutComponent },
    { path: 'addingitem', component: app_addingitem_component_1.AddingItemComponent },
    { path: 'subscribe', component: app_subscribe_component_1.SubscribeComponent },
    { path: 'detail/:id', component: app_about_element_component_1.ElementDetailComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                ng2_dragula_1.DragulaModule,
                router_1.RouterModule.forRoot(routes)
            ],
            declarations: [
                app_component_1.AppComponent,
                app_doing_component_1.DoingComponent,
                app_about_component_1.AboutComponent,
                app_addingitem_component_1.AddingItemComponent,
                app_subscribe_component_1.SubscribeComponent,
                app_about_element_component_1.ElementDetailComponent
            ],
            providers: [
                myhttp_service_1.MyHttpService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map