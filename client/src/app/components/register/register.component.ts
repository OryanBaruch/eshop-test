import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public AuthService: AuthService,
    public FormBuilder: FormBuilder
  ) { }
  public registerForm:FormGroup

  ngOnInit(): void {
    this.registerForm = this.FormBuilder.group({
      username: [''],
      password  : ['']
    })
  }

  public handleRegister = () => {
    this.AuthService.register(this.registerForm.value)
    this.AuthService.showSnackBar(`Registered Succeessfully.`)
  }

}
