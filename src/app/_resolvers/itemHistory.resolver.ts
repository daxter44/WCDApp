import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MonitoredHistoryItem } from '../_models';
import { MonitoredItemsService } from '../_services';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemHistoryResolve implements Resolve<MonitoredHistoryItem[]> {
  constructor(private monitoredItemsService: MonitoredItemsService) {}
 
  resolve(route: ActivatedRouteSnapshot) {
    return this.monitoredItemsService.getHistory(route.params['id']);
  }
}