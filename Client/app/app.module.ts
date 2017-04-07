import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { RouterModule, Routes }   from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { DoingComponent } from './app.doing.component';
import { AboutComponent } from './app.about.component';
import { AddingItemComponent } from './app.addingitem.component';
import { SubscribeComponent } from './app.subscribe.component';
import { ElementDetailComponent } from './app.about-element.component'

import { MyHttpService } from './myhttp.service';

const routes: Routes = [
  { path: '', redirectTo: 'doing', pathMatch: 'full' },
  { path: 'doing',      component: DoingComponent },
  { path: 'about',      component: AboutComponent },
  { path: 'addingitem', component: AddingItemComponent },
  { path: 'subscribe',  component: SubscribeComponent },
  { path: 'detail/:id', component: ElementDetailComponent },
];

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    DragulaModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [ 
    AppComponent,
    DoingComponent,
    AboutComponent,
    AddingItemComponent,
    SubscribeComponent,
    ElementDetailComponent
  ],
  providers: [
    MyHttpService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
