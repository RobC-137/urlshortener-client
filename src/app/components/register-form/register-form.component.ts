import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  error = '';
  loading = false;
  returnUrl: string;

  register = new FormGroup({
    email: new FormControl('', [Validators.required]),

    passwords: new FormGroup(
      {
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      [this.matchValidator]
    ),
  });
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit() {}

  matchValidator(group: FormGroup) {
    let valid = true;
    let prev = null;

    for (let name in group.controls) {
      const val = group.controls[name].value;
      if (prev === null) prev = val;
      else {
        if (prev !== val) {
          valid = false;
          break;
        } else prev = val;
      }
    }

    console.log(valid);

    if (valid) {
      return null;
    }

    return {
      mismatch: true,
    };
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) return;
    console.log(form);
    this.auth
      .register({
        email: form.value.email,
        password: form.value.passwords.password,
      })
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
