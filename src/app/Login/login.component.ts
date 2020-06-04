
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService, AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { $animations } from './login.animations';
import { User } from '../_models';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css'],
    animations: $animations
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl:String;
    selectedTab:Number
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<LoginComponent>,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
       ) {
           
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        this.registerForm = this.fb.group({
            newEmail: ['', [Validators.required, Validators.email]],
            newPassword: ['', Validators.required],
            rePassword: ['', Validators.required] 
        }, {validator: this.checkPasswords });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
     
    save() {
        this.dialogRef.close(this.form.value);
    }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.form.controls.email.value, this.form.controls.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.dialogRef.close(this.authenticationService.currentUserValue);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    SignIn() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.form.controls.email.value, this.form.controls.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.dialogRef.close(this.authenticationService.currentUserValue);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    register() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        let user = new User();
        user.eMail = this.registerForm.controls.newEmail.value;
        user.password = this.registerForm.controls.newPassword.value;
        this.authenticationService.registerNew(user)
            .pipe(first())
            .subscribe(
                data => {
                    this.dialogRef.close(this.authenticationService.currentUserValue);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    close() {
        console.log("chcial bym zamknac okno")
        this.dialogRef.close();
    }
    checkPasswords(validForm: FormGroup) { // here we have the 'passwords' group
            if(validForm != null) {
            let newPassword = validForm.controls.newPassword.value;
            let rePassword = validForm.controls.rePassword.value;

            return newPassword === rePassword ? null : { notSame: true }    } 
}
}
