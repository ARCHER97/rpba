import { Component } from '@angular/core';
import { MyHttpService } from './myhttp.service';
import { Router }   from '@angular/router';

@Component({
  selector: 'about',
  template: `
    <div class="col-sm-12">
        <div class="col-sm-12">
            <div class="col-sm-3">
                name:
            </div> 
            <div class="col-sm-9">
                <input [(ngModel)]="name" class="col-sm-4"/>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="col-sm-3">
                about:
            </div>
            <div class="col-sm-9">
                <input [(ngModel)]="about" class="col-sm-4"/>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="col-sm-3">
                category: 
            </div>
            <div class="col-sm-9">
                <select [(ngModel)]="category" class="col-sm-4">
                    <option *ngFor="let c of categories" [ngValue]="c">{{c}}</option>
                </select>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="col-sm-3">
                price: 
            </div>
            <div class='col-sm-9'>
                <input name="phone" [(ngModel)]="price" class="col-sm-4" #phone="ngModel"
                required pattern="^[0-9]+$" />
            </div>
        </div>
        <div class="col-sm-12" >
            <button [disabled]="phone.invalid" 
                (click)="addItem()">Add item</button>
        </div>
    </div>
    `,
    styleUrls: ['../app/stylefiles/app.addingitem.component.css']
})
export class AddingItemComponent {
    name: string;
    about: string;
    category: string = null;
    price: number;
    categories: any[];
    constructor(private myHttpService: MyHttpService, private router: Router){
        myHttpService.getCategories()
            .subscribe(categories=>{
                this.categories = categories;
        });
    }

    addItem(){
        //^[a-zA-Z0-9]+$
        console.log(this.name, this.about, this.category, this.price);
        this.myHttpService.addItem(this.name, this.about, this.category, this.price, 
            JSON.parse(localStorage.getItem('profile')).user_id);
        setTimeout(()=>{
            this.router.navigate(['/doing']);
        }, 100);
    }
}