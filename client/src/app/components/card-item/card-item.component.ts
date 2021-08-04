import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {


  constructor(
    public AuthService: AuthService,
    public ProductService: ProductsService,
    public AdminService: AdminServiceService,
    public CartService: CartService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
  }

  public amount: Number = 1



  public getAmountValue = (event: any) => {
    this.amount = event.target.value
  }

  public handleBuyProduct = (product: any, amount: number) => {
    console.log(product)
    this.CartService.buyProdcut({
      product: product,
      cartID: localStorage.getItem('my_cartID'),
      amount: this.amount
    })
    this.AuthService.showSnackBar('Added to cart!')
  }

  public handleEdit = (body: any) => {
    this.AdminService.editedProduct = body
    this.dialog.open(EditProductComponent)
  }

}
