import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MonitoredItemsTableComponent } from './monitoredItemsTable.component';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MonitoredItemsService } from '../_services';
import { ItemHistoryResolve } from '../_resolvers/itemHistory.resolver';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { ItemHistoryTableComponent } from './ItemHistoryTable/itemHistoryTable.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        MonitoredItemsTableComponent,
        ItemHistoryTableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatSlideToggleModule
    ],
    providers: [
      MonitoredItemsService,
      ItemHistoryResolve ,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ]
})
export class MonitoredItemsTableModule {
}