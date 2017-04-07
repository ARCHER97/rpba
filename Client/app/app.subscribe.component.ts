import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { MyHttpService } from './myhttp.service';
@Component({
  selector: 'about',
  template: `
    <div class='wrapper'>
        <div class='col-sm-6'>
            <h4>Categories without subscribe</h4>
            <div [ngClass]="['container','col-sm-6']" style="border: 4px double black; widtch: 50%;" 
                        [dragula]='"another-bag"' [dragulaModel]='many'>
                <div *ngFor='let text of many'>
                    {{text}}
                </div>
            </div>
        </div>
        <div class='col-sm-6'>
            <h4>Categories with subscribe</h4>
            <div [ngClass]="['container','col-sm-6']" style="border: 4px double black; widtch: 50%;" 
                        [dragula]='"another-bag"' [dragulaModel]='many2'>
                <div *ngFor='let text of many2'>
                    {{text}}
                </div>
            </div>
        </div>
    </div>
    <div class='col-sm-12' style="padding-top: 10px">
        <button (click)="saveMyCategories()">Save</button>
    </div>
    `,
    styleUrls: ['../node_modules/dragula/dist/dragula.css']
})
export class SubscribeComponent {
    public many: Array<string> = ['1'];
    public many2: Array<string> = ['1'];

    constructor(private dragulaService: DragulaService,
                private myHttpService: MyHttpService) {
        
        this.myHttpService.getCategories()
            .subscribe(data=>{
                this.many = data;
        });

        this.myHttpService.getMyCategories(JSON.parse(localStorage.getItem('profile')).user_id)
            .subscribe(data=>{
                console.log(data[0]);
                this.many2 = JSON.parse(data[0]);
                if(this.many2==['']){
                    this.many2=[''];
                }

                this.many2.forEach(element=>{
                    console.log(element+" "+this.many.indexOf(element))
                    this.many.forEach(el=>{
                        console.log("--"+el);
                    })
                    if(this.many.indexOf(element)!=-1){
                        console.log("delete:"+this.many.splice(this.many.indexOf(element),1));
                    }
                });
        });

        
        
        dragulaService.dropModel.subscribe((value) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value) => {
            this.onRemoveModel(value.slice(1));
        });

    }

    private onDropModel(args) {
        let [el, target, source] = args;
        // do something else
    }

    private onRemoveModel(args) {
        let [el, source] = args;
        // do something else
    }

    private saveMyCategories(){
        console.log(JSON.stringify(this.many2));
        this.myHttpService.setMyCategories(JSON.parse(localStorage.getItem('profile')).user_id,
            JSON.stringify(this.many2))
            .subscribe();
    }
}