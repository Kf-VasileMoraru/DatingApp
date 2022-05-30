import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from '../_services/account.service';
import {ToastrService} from 'ngx-toastr';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  private intitializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
  }

  private matchValues(matchTo: string) {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : {isMatching: true};
    };
  }

  // private matchValues(matchTo: string): ValidatorFn {
  //   return (control: AbstractControl) => {
  //     if (control.parent && control.parent.controls) {
  //       return control.value === (control.parent.controls as { [key: string]: AbstractControl })[matchTo].value
  //         ? null : { isMatching: true };
  //     }
  //     return null;
  //   }
  // }


  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.validationErrors = error;
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
