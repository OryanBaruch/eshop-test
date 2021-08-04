import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import cartInterface from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public http: HttpClient) { }
  public cartInfo: cartInterface
  public productsInCart: [] = []
  public sum: Number = 0
  public cartID: String = localStorage.getItem('cartID')

  public buyProdcut = (body) => {
    console.log(`The body: ${JSON.stringify(body)}`)
    return this.http.post(`http://localhost:5000/cart/add`, body).subscribe(
      (res: any) => {
        this.productsInCart = res.all_products_in_cart
        this.sum = res.sum
        localStorage.setItem('shoppingCartProducts', JSON.stringify(this.productsInCart))
      },
      (err: any) => {
        console.log(`The error with add to cart is ${err}`)
      }
    )
  }

  public generateCart = (body: any) => {
    console.log(body)
    return this.http.post(`http://localhost:5000/cart/make-cart`, body).subscribe(
      (res: any) => {
        console.log(`the res is :${JSON.stringify(res)}`)
        localStorage.setItem('my_cartID', res.cart._id)
        this.cartInfo = res.cart
      }),
      (err: any) => {
        console.log(`The error with generateCart is ${err}`)
      }
  }

  public clearCart = (cartID: any) => {
    return this.http.delete(`http://localhost:5000/cart/clear-cart/${cartID}`).subscribe(
      (res: any) => {
        this.productsInCart = []
        localStorage.removeItem('shoppingCartProducts')
        this.sum = 0;
      },
      (err: any) => {
        console.log(err)
      }
    )
  }
}
