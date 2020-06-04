import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User, MonitoredItem } from '../_models';
import { AuthenticationService, UserService, AlertService, MonitoredItemsService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../Login/login.component';


@Component({ templateUrl: 'activationPage.component.html', styleUrls: ['activationPage.component.css'] })
export class ActivationPageComponent implements OnInit{
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
    }

    ngOnInit(){
    }
    
}