import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderComponent } from './components/order/order.component';
import { StatsComponent } from './components/stats/stats.component';
//material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table'
import {MatExpansionModule} from '@angular/material/expansion';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddProdcutComponent } from './components/add-prodcut/add-prodcut.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    CardItemComponent,
    ShoppingCartComponent,
    OrderComponent,
    StatsComponent,
    EditProductComponent,
    AddProdcutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //material
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatGridListModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
