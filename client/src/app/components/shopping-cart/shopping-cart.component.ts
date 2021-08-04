import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    public ProductService: ProductsService,
    public CartService: CartService,
    public AuthService: AuthService
  ) { }
  public cartID: any = JSON.stringify(localStorage.getItem('my_cartID'))

  public panelOpenState = false;
  ngOnInit(): void {
    this.CartService.productsInCart = JSON.parse(localStorage.getItem('shoppingCartProducts'))
  }


  public handleClearCart = () => {
    let cartID = localStorage.getItem('my_cartID')
    this.CartService.clearCart(cartID)
    this.AuthService.showSnackBar('Cleared cart')
  }

}
