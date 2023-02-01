import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { SpringService } from 'src/app/services/spring.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email! : string;

  password! : string;

  constructor(private spring: SpringService) { }

  public onSubmit(): void {

    let user: User = { email: this.email, password: this.password };

    this.spring.login(user).subscribe({
      next: user => {
        console.log(user);
        // this.router.navigate(['/home']);
      },
      error: err => { console.log(err); }
    });

  }

  ngOnInit(): void {}

}
