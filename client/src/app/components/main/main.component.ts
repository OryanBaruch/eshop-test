import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProdcutComponent } from '../add-prodcut/add-prodcut.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(

    public ProductService: ProductsService,
    public AuthService: AuthService,
    public OrderService: OrderService,
    public CartService: CartService,
    public dialog: MatDialog,
    public Router: Router
  ) { }

  public userName: String = JSON.parse(localStorage?.getItem('userInfo'))?.username
  public cartProducts = JSON.stringify(localStorage.getItem('shoppingCartProducts'))

  ngOnInit(): void {
    this.ProductService.fetchProducts()
    console.log(this.userName)
  }

  public handleLogout = () => {
    this.AuthService.logout()
  }

  public handleAddProduct = () => {
    this.dialog.open(AddProdcutComponent)
  }

  public redirectStats = () => {
    this.Router.navigateByUrl('/stats')
  }

  public handleOrder = () => {
    let userID = JSON.parse(localStorage.getItem('userInfo')).id
    let cartID=JSON.stringify(localStorage.getItem('my_cartID'))
    this.OrderService.order({
      items: this.CartService.productsInCart,
      userID: userID,
      cartID: cartID
    })
    localStorage.removeItem('shoppingCartProducts')
    this.CartService.productsInCart = []
  }

}
