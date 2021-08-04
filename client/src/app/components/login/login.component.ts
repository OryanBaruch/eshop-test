import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public AuthService: AuthService,
    public FormBuilder: FormBuilder,
    public CartService: CartService,
    public Router: Router,
    public StatService: StatsService
  ) { }

  public userInfoFromLocal = JSON.parse(localStorage.getItem('userInfo'))

  public loginForm: FormGroup
  ngOnInit(): void {
    this.AuthService.fetchUsers()
    this.loginForm = this.FormBuilder.group({
      username: ['test', [Validators.required]],
      password: ['123', [Validators.required]]
    })
  }

  public handleLogin = () => {
    this.AuthService.login(this.loginForm.value).subscribe(
      (res: any) => {
        let decoded: any = jwtDecode(res.access_token)
        this.AuthService.userInfo = decoded
        localStorage.access_token = res.access_token
        this.AuthService.userInfo.token = localStorage.getItem('access_token')

        this.CartService.generateCart({ userID: this.AuthService.userInfo?.id })
        console.log(this.AuthService.userInfo?.id)
        localStorage.setItem('userInfo', JSON.stringify(decoded))
        this.AuthService.localStorageData = JSON.parse(localStorage.getItem('userInfo'))

        this.AuthService.showSnackBar(`Welcome ${JSON.parse(localStorage.getItem('userInfo')).username}`)
        this.Router.navigateByUrl('/main')
      },
      (err: any) => {
        this.AuthService.showSnackBar(err.error.msg)
      }
    )
  }

}
