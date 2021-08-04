import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import productInterface from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http:HttpClient) { }
  public products:productInterface

  public fetchProducts=()=>{
    return this.http.get(`http://localhost:5000/product/all-products`).subscribe(
      (res:any)=>{
        this.products=res.fetchProducts
        console.log(this.products)
      },
      (err:any)=>{
        console.log(`The error is ${err}`)
      }
    )
  }
}
