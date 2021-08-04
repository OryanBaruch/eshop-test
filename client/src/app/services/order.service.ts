import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import cartDetailsInterface from '../interfaces/cartDetails.interface';
import orderInterface from '../interfaces/order.interface';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  static fetchShopStats(): any {
    throw new Error('Method not implemented.');
  }

  constructor(
    public http: HttpClient,
    public CartServie: CartService
  ) { }
  public orders: orderInterface
  public cartDetails: cartDetailsInterface
  public msg: String = ''
  public stats: any = {}

  public order = (body) => {
    let cartID = localStorage.getItem('my_cartID')
    return this.http.post(`http://localhost:5000/order/order/${cartID}`, body).subscribe(
      (res: any) => {
        alert(res.msg)
        this.orders = res.newOrder
        this.cartDetails = res.cartDetails
        this.CartServie.productsInCart = []
        this.CartServie.sum = 0
      },
      (err: any) => {
        console.log(`the error is ${err}`)
      }
    )
  }

}
