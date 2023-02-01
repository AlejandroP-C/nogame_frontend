import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username! : string;

  email! : string;

  password! : string;

  rPassword! : string;

  constructor() {}

  public onSubmit(): void {

    console.log(this.username);
    console.log(this.email);
    console.log(this.password);  
    console.log(this.rPassword);

  }
  
  ngOnInit(): void {}

}