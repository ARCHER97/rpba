import { Injectable }     from '@angular/core';
import {Headers, RequestOptions, Http, Response, Request} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Item } from './classes/item';
import 'rxjs/Rx';

@Injectable()
export class MyHttpService {
  private serverUrl = 'http://localhost:8888/';  // URL to web API

  constructor (private http: Http) {}
  
  authMetod(id: any, login: any){
    let body = JSON.stringify({ id: id, login: login});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(this.serverUrl+"user/auth")
    this.http.post(this.serverUrl+"user/auth", body, options)
      .subscribe();
  }

  getCategories(): Observable<Array<any>>{
     return this.http.get(this.serverUrl+"category/getcategories")
                    .map(this.extractDataCategory)
                    .catch(this.handleError);
  }

  getMyCategories(id: any): Observable<Array<any>>{
    let body = JSON.stringify({ id: id});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.serverUrl+"category/getmycategories", body, options)
      .map(this.extractDataMyCategory);
  }

  setMyCategories(id: any, categories: any){
    let body = JSON.stringify({ id: id, categories: categories});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.serverUrl+"category/setmycategories", body, options);
  }

  getItems(): Observable<Array<any>>{
     return this.http.get(this.serverUrl+"item/getitems")
                    .map(this.extractDataItem)
                    .catch(this.handleError);
  }

  getItem(id: number): Observable<Array<any>>{
     return this.http.get(this.serverUrl+"item/getitem?id="+id)
                    .map(this.extractDataItem)
                    .catch(this.handleError);
  }

  getItemsWithCategory(category: string): Observable<Array<any>>{
    let body = JSON.stringify({ category: category});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.serverUrl+"item/getitemswithcategory", body, options)
      .map(this.extractDataItem);
  }

  addItem(name: string, about: string, category: string, price: number, user_id: any){
    let body = JSON.stringify({ name: name, about: about, category: category, price: price, user_id: user_id });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.serverUrl+"item/additem", body, options)
      .subscribe();
  }

  deleteItem(id: number){
    let body = JSON.stringify({ id: id });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.serverUrl+"item/deleteitem", body, options)
      .subscribe();
  }

  private extractDataCategory(res: Response) {
    let body = res.json();
    let resultArray = new  Array<any>()
    for(let i = 0; i< res.json().length; i++)
    {
       resultArray.push(res.json()[i].category);
    }
    return resultArray
  }

  private extractDataMyCategory(res: Response) {
    let body = res.json();
    let resultArray = new  Array<any>()
    for(let i = 0; i< res.json().length; i++)
    {
       resultArray.push(res.json()[i].body);
    }
    return resultArray
  }

  private extractDataItem(res: Response) {
    let body = res.json();
    let resultArray = new  Array<any>()
    for(let i = 0; i< res.json().length; i++)
    {
       resultArray.push(new Item(res.json()[i].id,res.json()[i].name,
              res.json()[i].about,res.json()[i].price,res.json()[i].user_id));
    }
    return resultArray
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
