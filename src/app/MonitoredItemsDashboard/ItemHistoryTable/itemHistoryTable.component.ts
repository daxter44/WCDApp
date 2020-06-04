import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonitoredItemsService, AlertService } from 'src/app/_services';


@Component({
  selector: 'itemHistoryTable',
  styleUrls: ['itemHistoryTable.component.css'],
  templateUrl: 'itemHistoryTable.component.html',
})
export class ItemHistoryTableComponent implements OnInit{
  displayedColumns: string[] = ['position', 'message', 'date'];
  dataSource ;//= ELEMENT_DATA;
  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private monitoredItemsService: MonitoredItemsService,
    private alertService: AlertService) {

}

ngOnInit(){
    this.dataSource = this.activatedRouter.snapshot.data.itemsHistory;
}

}
