import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  toLowerCase() {
    throw new Error('Method not implemented.');
  }

  constructor(private http : HttpClient) { }

  postCategory(data : any){
    return this.http.post<any> ("http://localhost:3000/Category/",data);
  }
  getCategory(){
    return this.http.get<any> ("http://localhost:3000/Category/");
  }
  putCategory(data:any, id:number){
    return this.http.put<any> ("http://localhost:3000/Category/"+id,data);
  }

  deleteCategory(id:number){
    return this.http.delete<any> ("http://localhost:3000/Category/"+id);
  }

}
