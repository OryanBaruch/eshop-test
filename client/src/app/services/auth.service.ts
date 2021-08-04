import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CartService } from './cart.service';
import userInterface from '../interfaces/user.interface';
import registerUserInterface from '../interfaces/registerUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient,
    public CartService: CartService,
    public Snackbar: MatSnackBar,
    public Router: Router
  ) { }


  public registeredUsers: registerUserInterface
  public localStorageData: any
  public userInfo: userInterface = localStorage.getItem('userInfo') ?
    jwtDecode(localStorage.getItem('userInfo')) : {};


  public showSnackBar = (msg) => {
    this.Snackbar.open(msg, '', {
      duration: 1500,
      verticalPosition: 'top'
    })
  }

  public fetchUsers = () => {
    return this.http.get(`http://localhost:5000/auth/fetch-users`).subscribe(
      (res: any) => {
        this.registeredUsers = res.fetchUsers
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  public login = (body: any) => {
    return this.http.post(`http://localhost:5000/auth/login`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  public register = (body: any) => {
    return this.http.post(`http://localhost:5000/auth/register`, body, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(
      (res: any) => {
        this.registeredUsers = res.registerNewUser
        this.Router.navigateByUrl('/login')
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  public logout = () => {
    localStorage.clear()
    this.Router.navigateByUrl('/login')
  }

}
