import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { concat } from 'rxjs';
import { Planet } from 'src/app/interfaces/planet';
import { Player } from 'src/app/interfaces/player';
import { User } from 'src/app/interfaces/user';
import { LocalService } from 'src/app/services/local.service';
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
    private localService: LocalService,
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

        let newUser = { ...user, nickname: this.registerForm.value['username'] }

        const newPlayer: Player = { user: user.email };

        const firstPlanet: Planet = this.localService.createRandomPlanet(user.email, true);

        let updateUser = { ...newUser, first: firstPlanet.name };

        // ? Execute inserts in order
        concat(

          //? Insert into supabase new user
          this.supabaseService.insertData('user', environment.supabaseKey, newUser),

          // ? Create player with no type and associate to user
          this.supabaseService.insertData('player', environment.supabaseKey, newPlayer),

          // ? Create first planet and associate with user
          this.supabaseService.insertData('planet', environment.supabaseKey, firstPlanet),

          // ? Update user from database with home planet
          this.supabaseService.updateData(`user?email=eq.${user.email}&select=*`, environment.supabaseKey, updateUser)

        ).subscribe();

        this.router.navigate(['login']);

      }
    });

  }

}