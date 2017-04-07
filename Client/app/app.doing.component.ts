import { Component, Input } from '@angular/core'
import { Item } from './classes/item'
import { MyHttpService } from './myhttp.service'
import { Router }   from '@angular/router';

@Component({
  selector: 'doing',
  template: `
    <div class="col-sm-2">
        <ul class="nav nav-pills nav-stacked">
            <li class="active" (click)="onSelectCategory('all')"><a>All category</a></li>
            <li *ngFor="let category of categorys" [class.selected]="category === selectedCategory" 
                    (click)="onSelectCategory(category)">
                {{category}}
            </li>
        </ul>
    </div>
    <div class="col-sm-4">
        <ul class="items">
            <li *ngFor="let item of items" [class.selected]="item === selectedItem" (click)="onSelect(item)">
                <span class="badge">{{item.id}}</span> {{item.name}}
            </li>
        </ul>
    </div>
    <div class="col-sm-6">
        <div *ngIf="selectedItem">
            <h2>{{selectedItem.name}} details!</h2>
            <div>
                <label>id: </label>{{selectedItem.id}}
            </div>
            <div>
                <label>name: {{selectedItem.name}}</label>
                <pre>{{selectedItem.about}}</pre>
            </div>
            <div>
                <button *ngIf="compareUserItem()" (click)="deleteItem()">Delete item</button>
            </div>
        </div>
        <div *ngIf="!selectedItem">
            <h2>SELECT ITEM</h2>
        </div>
    </div>
    `,
    styleUrls: ['../app/stylefiles/app.doing.component.css']
})
export class DoingComponent {
    items: Item[];
    categorys: any[];
    selectedItem: Item;
    selectedCategory: string;
    constructor(private myHttpService: MyHttpService, private router: Router) {
        this.myHttpService.getCategories()
            .subscribe(data=>{
                this.categorys = data;
            });
        this.myHttpService.getItems()
            .subscribe(data=>{
                this.items = data;
            });
    }
    
    onSelect(item: Item): void {
        this.selectedItem = item;
        this.gotoDetail()
    }

    onSelectCategory(category: string): void {
        this.selectedItem = null;
        this.selectedCategory = category;
        if(category==='all') this.myHttpService.getItems()
            .subscribe(data=>{
                this.items = data;
            }); 
        else this.myHttpService.getItemsWithCategory(category)
            .subscribe(data=>{
                this.items = data;
            }); 
    }

    deleteItem(){
        this.myHttpService.deleteItem(this.selectedItem.id);
        var item: Item;
        this.items.forEach(element=>{
            if(element.id==this.selectedItem.id)item = element;
        });
        this.items.splice(this.items.indexOf(item),1);
        this.selectedItem = null;
    }

    compareUserItem(){
        if(!!JSON.parse(localStorage.getItem('profile')))
            return this.selectedItem.user_id==JSON.parse(localStorage.getItem('profile')).user_id ;
        else return false;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedItem.id]);
    }
}