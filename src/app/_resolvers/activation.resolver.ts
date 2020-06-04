import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MonitoredHistoryItem, User } from '../_models';
import { AuthenticationService } from '../_services';
import { Injectable } from '@angular/core';

@Injectable()
export class ActivationResolver implements Resolve<User> {
  constructor(private authenticateService: AuthenticationService) {}
 
  resolve(route: ActivatedRouteSnapshot) {
      return this.authenticateService.ActivateAccount(route.params['code']);
  }
}