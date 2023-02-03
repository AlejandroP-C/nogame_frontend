import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { SpringService } from 'src/app/services/spring.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username!: string;

  email!: string;

  password!: string;

  rPassword!: string;

  constructor(private spring: SpringService, private router: Router) { }

  public onSubmit(): void {

    console.log("aaaaaaaaa");
    

    let user: User = { email: this.email, password: this.password };

    this.spring.register(user).subscribe({
      next: user => {
        console.log(user);
        // this.router.navigate(['/login']);
      },
      error: err => { console.log(err); }
    });

  }

  ngOnInit(): void { }

}