import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User, MonitoredItem } from '../_models';
import { AuthenticationService, UserService, AlertService, MonitoredItemsService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../Login/login.component';


@Component({ templateUrl: 'home.component.html', styleUrls: ['home.component.css'] })
export class HomeComponent implements OnInit {
    currentUser: User;
    monitorForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    monitorItem: MonitoredItem;
    users = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private monitoredItemService: MonitoredItemsService,
        private alertService: AlertService,
        private dialog: MatDialog
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    
    openDialog() {

        const dialogConfig = new MatDialogConfig();
        console.log("im dialog from home");
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data => this.currentUser = data?.currentUserValue
        );    
    }
    ngOnInit() {
        this.monitorForm = this.formBuilder.group({
            Url: ['', Validators.required],
            Frequency: ['', Validators.required],
            ElementName: ['']
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.monitorForm.controls; }
    get isFirm() {
        return this.currentUser && this.currentUser.role === "";
    }
    onSubmit() {

        // reset alerts on submit
        this.alertService.clear();
        // stop here if form is invalid
        if (!this.currentUser) {
            this.openDialog()
        } else { 

        this.submitted = true;
        this.loading = true;

        console.log("form", this.monitorForm.value)

    //     console.log("form - url", this.monitorForm.controls.Url.value)
    //    // this.monitorItem.Url = this.f.Url.value;
    //     this.monitorItem.Frequency = this.f.Frequency.value;
    //     this.monitorItem.ElementName = this.f.ElementName.value;
        this.monitoredItemService.create(this.monitorForm.value).pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Item added successful', true);
                this.loading = false;
                this.router.navigate(['/myItems']);
            },
            error => {
                console.log(error);
                this.alertService.error(error);
                this.loading = false;
            });
             }
    }
}