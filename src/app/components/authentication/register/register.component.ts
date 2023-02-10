import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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

  registerForm: FormGroup;

  passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const ps = control.get('password');
    const ps2 = control.get('rPassword');   
    return ps && ps2 && ps.value === ps2.value ? null : { passwordValidator: true };
  };

  constructor(
    private spring: SpringService,
    private supabaseService: SupabaseService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8)]
        ],
        rPassword: ['', Validators.required],
      }, { validators: this.passwordValidator }
    );     

  }

  ngOnInit(): void { }

  public onSubmit(): void {
    
    let user: User = { email: this.registerForm.value['email'], password: this.registerForm.value['password'] };

    this.spring.register(user).subscribe({
      next: user => {
        let updateUser = { ...user, nickname: this.registerForm.value['username'] }
        this.supabaseService.insertData('user', environment.supabaseKey, updateUser).subscribe();
        this.router.navigate(['/login']);
      }
    });

  }

}