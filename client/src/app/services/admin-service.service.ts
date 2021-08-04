import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(
    public http:HttpClient,
    public ProductsService:ProductsService
  ) { }

  public editedProduct:any

  public editProduct=(body)=>{
    console.log(body)
    return this.http.put(`http://localhost:5000/product/edit/${this.editedProduct._id}`, body).subscribe(
      (res:any)=>{
        this.ProductsService.fetchProducts()
      },
      (err:any)=>{
        console.log(err.error)
      }
    )
  }

  public addProductToShop=(body)=>{
    console.log(body)
    return this.http.post(`http://localhost:5000/product/add-products`, body).subscribe(
      (res:any)=>{
        this.ProductsService.products=res.addProduct[0]
        this.ProductsService.fetchProducts()
      },
      (err:any)=>{
        console.log(err.error)
      }
    )
  }
}
