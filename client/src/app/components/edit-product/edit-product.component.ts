import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(
    public AdminService:AdminServiceService,
    public FormBuilder:FormBuilder,
    public Router:Router
  ) { }
  public myForm:FormGroup

  ngOnInit(): void {
    this.myForm = this.FormBuilder.group({
      title:[this.AdminService.editedProduct?.title],
      description:[this.AdminService.editedProduct.description?.description],
      price:[this.AdminService.editedProduct?.price],
      image:[this.AdminService.editedProduct?.image],
    })
  }

  handleEdit=()=>{
    this.AdminService.editProduct(this.myForm.value)
    }

}
