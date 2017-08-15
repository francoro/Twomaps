import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

const API_URL: string = "http://mdp365-appserver-env.ncfgtbfmgy.sa-east-1.elasticbeanstalk.com";
const LOCAL_URL: string = "http://192.168.1.96:3000";

@Injectable()
export class PropertiesService {
  ajaxCall: any = null;
  ajaxCallMarkers: any = null;
  constructor(public http: Http) {

  }

  getMarkers(params) {
    if (this.ajaxCallMarkers) {
      this.ajaxCallMarkers.unsubscribe();
    }
    return new Promise((resolve) => {
      this.ajaxCallMarkers = this.http
        .post(`${API_URL}/getMarkers`, params)
        .subscribe((response: Response) => {
          let res = response.json();
          resolve(res);
          this.ajaxCallMarkers = null;
        });
    })
  }

  getClusters(params) {
    if (this.ajaxCall) {
      this.ajaxCall.unsubscribe();
    }
    return new Promise((resolve) => {
      this.ajaxCall = this.http
        .post(`${API_URL}/getClusters`, params)
        .subscribe((response: Response) => {
          let res = response.json();
          resolve(res);
          this.ajaxCall = null;
        });
    })
  }

}