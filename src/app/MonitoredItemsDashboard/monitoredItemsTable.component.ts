import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitoredItemsService, AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { MonitoredItem } from '../_models';


@Component({
  selector: 'monitoredItemsTable',
  styleUrls: ['monitoredItemsTable.component.css'],
  templateUrl: 'monitoredItemsTable.component.html',
})
export class MonitoredItemsTableComponent implements OnInit{
  displayedColumns: string[] = ['position', 'url', 'frequency', 'elementName',  'isActive', 'actions'];
  dataSource ;//= ELEMENT_DATA;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private monitoredItemsService: MonitoredItemsService,
    private alertService: AlertService) {

}

ngOnInit(){
    this.loadlistItems()
}
private loadlistItems() {
    this.monitoredItemsService.getAll()
        .pipe(first())
        .subscribe(
                items => {
                    this.dataSource = items;
                },
                error => {
                    this.alertService.error(error);
                });
}
changeToggle(monitredItem:MonitoredItem){
    if(!monitredItem.isActive){
        this.startMonit(monitredItem)
    }else{
        this.stopMonit(monitredItem)
    }
}
startMonit(monitredItem:MonitoredItem){
    console.log("id:" + monitredItem.MonitItemId);
    this.monitoredItemsService.startMonit(monitredItem)
    .pipe(first())
    .subscribe(
            items => {
                this.dataSource = this.loadlistItems();
            },
            error => {
                this.alertService.error(error);
            });
}
stopMonit(monitredItem:MonitoredItem){

    console.log("url:" + monitredItem.Url);
    this.monitoredItemsService.stopMonit(monitredItem)
    .pipe(first())
    .subscribe(
            items => {
                this.dataSource = this.loadlistItems();
            },
            error => {
                this.alertService.error(error);
            });
}
showHistory(MonitItemId:number) {
    console.log("id:" + MonitItemId);
    this.router.navigate(['/history/' + MonitItemId]);
}  
delete(MonitItemId:string) {
    console.log("id:" + MonitItemId);
    this.monitoredItemsService.delete(MonitItemId)
    .pipe(first())
    .subscribe(() => this.loadlistItems());
}

}
