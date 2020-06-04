import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonitoredItem, MonitoredHistoryItem } from '../_models';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class MonitoredItemsService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<MonitoredItem[]>(`${environment.baseUrl}/MonitoredItems`);
    }
    getHistory(id: string) {
        let item = new MonitoredItem();
        item.MonitItemId = id;
        return this.http.post<MonitoredHistoryItem[]>(`${environment.baseUrl}/MonitoredItems/getHistory/`,item );
    }
    create(item: MonitoredItem) {
        return this.http.post(`${environment.baseUrl}/MonitoredItems/create`, item);
    }
    update(id: string, item: MonitoredItem) {
        return this.http.put(`${environment.baseUrl}/MonitoredItems`, item);
    }
    delete(id: string) {
        return this.http.delete(`${environment.baseUrl}/MonitoredItems/${id}`);
    }
    startMonit(item: MonitoredItem) {
        return this.http.post<MonitoredItem>(`${environment.baseUrl}/MonitoredItems/StartMonit`,item );
    }
    stopMonit(item: MonitoredItem) {
        return this.http.post<MonitoredItem>(`${environment.baseUrl}/MonitoredItems/StopMonit`,item );
    }
}