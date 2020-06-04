import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { HomeComponent } from './Home/home.component';
import { MonitoredItemsTableComponent } from './MonitoredItemsDashboard/monitoredItemsTable.component';
import { ItemHistoryTableComponent } from './MonitoredItemsDashboard/ItemHistoryTable/itemHistoryTable.component';
import { ItemHistoryResolve } from './_resolvers/itemHistory.resolver';
import { ActivationPageComponent } from './ActivationPage/activationPage.component';
import { ActivationResolver } from './_resolvers/activation.resolver';
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'myItems', component: MonitoredItemsTableComponent , canActivate: [AuthGuard] },
  { path: 'history/:id', component: ItemHistoryTableComponent, canActivate: [AuthGuard], resolve: { itemsHistory : ItemHistoryResolve }},
  { path: 'userActivation/:code', component: ActivationPageComponent, resolve: { any : ActivationResolver }},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }