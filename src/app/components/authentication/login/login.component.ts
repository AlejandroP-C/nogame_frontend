import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { SpringService } from 'src/app/services/spring.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  display: boolean = false;

  constructor(
    private spring: SpringService,
    private router: Router
  ) { }

  public onSubmit(): void {

    let user: User = { email: this.email, password: this.password };

    this.spring.login(user).subscribe({
      next: user => {
        this.spring.isNewPlayer(user.email).subscribe(
          (response) => {
            if (response) {
              this.router.navigate(['/type']);
            } else { this.router.navigate(['/main']) }
          }
        );
      }
    });

  }

  ngOnInit(): void { }

}
