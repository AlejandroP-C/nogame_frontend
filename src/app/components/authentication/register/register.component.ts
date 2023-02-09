import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { SpringService } from 'src/app/services/spring.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { environment } from 'src/environments/environment';

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

  constructor(
    private spring: SpringService,
    private supabaseService: SupabaseService,
    private router: Router
  ) { }

  public onSubmit(): void {

    let user: User = { email: this.email, password: this.password };

    this.spring.register(user).subscribe({
      next: user => {
        let updateUser = { ...user, nickname: this.username }
        this.supabaseService.insertData('user', environment.supabaseKey, updateUser).subscribe();
        this.router.navigate(['/login']);
      }
    });

  }

  ngOnInit(): void { }

}