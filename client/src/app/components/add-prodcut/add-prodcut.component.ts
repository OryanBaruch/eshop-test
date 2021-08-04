import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-add-prodcut',
  templateUrl: './add-prodcut.component.html',
  styleUrls: ['./add-prodcut.component.css']
})
export class AddProdcutComponent implements OnInit {

  constructor(
    public FormBuilder: FormBuilder,
    public AdminService: AdminServiceService
  ) { }
  public addForm: FormGroup

  ngOnInit(
  ): void {
    this.addForm = this.FormBuilder.group({
      title: [''],
      description: [''],
      price: [''],
      image: [''],
    })
  }

  public handleAddAdminForm = () => {
    this.AdminService.addProductToShop(this.addForm.value)
  }


}
