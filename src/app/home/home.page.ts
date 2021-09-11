/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // 2 api calls. so we can demo a couple methods for caching
  users = [];
  joke = null;
  appIsOnline = true;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    const status = await Network.getStatus();
    this.appIsOnline = status.connected;

    Network.addListener('networkStatusChange', (statusChange) => {
      // console.log('Network status changed', statusChange);
      this.appIsOnline = statusChange.connected;
    });
  }

  getData() {
    this.http.get('https://randomuser.me/api/?results=5').subscribe((res) => {
      // console.log(`users res ${JSON.stringify(res)}`); //TODO: Remove comment
      this.users = res['results'];
    });
  }

  getOnlineData() {
    this.http
      .get('https://api.chucknorris.io/jokes/random')
      .subscribe((res) => {
        // console.log(`joke res ${JSON.stringify(res)}`); //TODO: Remove comment
        this.joke = res;
      });
  }
}
