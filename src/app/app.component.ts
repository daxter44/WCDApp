import { Component } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AuthenticationService } from './_services';
import { User } from './_models';
import { NavigationStart, NavigationEnd, Event, Router} from '@angular/router';
import './_content/app.less';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './Login/login.component';

@Component({ selector: 'app', templateUrl: 'app.component.html' , styleUrls: ['app.component.css']})
export class AppComponent {
    currentUser: User;
    title:string;

    constructor(
        private lBar: SlimLoadingBarService,
        private router: Router,
        private authenticationService: AuthenticationService,
        private dialog: MatDialog
    ) {
        this.router.events.subscribe((event: Event) => {
            console.log(event);
            this.loadingBarInterceptor(event);
          });
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    private loadingBarInterceptor(event: Event) {
        if (event instanceof NavigationStart) {
          this.lBar.start();
        }
        if (event instanceof NavigationEnd) {
          this.lBar.complete();
        }
      }
    openLoginDialog() {

        const dialogConfig = new MatDialogConfig();
        console.log("im dialog from app component");
        dialogConfig.autoFocus = true;
      
        this.dialog.open(LoginComponent, dialogConfig);
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}