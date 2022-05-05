import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilde: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilde.group({
      email: [''],
      password: ['']
    })
  }
  login() {
    
    this._http.get<any>("http://localhost:3000/signup").subscribe(res=>{
        const user = res.find((a: any) => {
        return a.Email === this.loginForm.value.email && a.Password === this.loginForm.value.password
      })
      console.log(user);
      if(user) {
        alert("Login Success!");
        this.loginForm.reset();
        this.router.navigate(['restaurant']);
      }else{
        alert("Invalid Email or Password!");
      }
    }, err => {
      alert("____ERROR____")
    }
    )
  }
}
