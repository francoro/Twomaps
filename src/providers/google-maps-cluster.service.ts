import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {
    Marker,
    GoogleMapsEvent,
    LatLng,
    MarkerOptions
} from '@ionic-native/google-maps';
@Injectable()
export class GoogleMapsCluster {

    markerCluster: any;
    locations: any = [];
    marker: any;
    markers: any = [];
    markerOptions: any;

    constructor(public http: Http, public platform: Platform, private storage: Storage) {
    }

    removeMarkers(map) {
        map.clear();
    }

    addCluster(map, locations, isCluster, zoom) {
        return new Promise((resolve) => {
            let __this = this;

            this.removeMarkers(map);
            this.locations = [];
            this.locations = locations;
            this.platform.ready().then(() => {

                if (!isCluster) {
                    this.markers = [];
                    for (let i = 0; i < locations.length; i++) {
                        let latlng: LatLng = new LatLng(locations[i].lat, locations[i].lng);

                        let markerOptions = {
                            position: latlng,
                            data: locations[i].id,
                            disableAutoPan: true
                        };
                        /*this.markers.push(markerOptions);*/
                        const marker: Marker = map.addMarker(markerOptions)
                            .then((marker: Marker) => {
                                marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                         
                            
                                    
                                })
                            });
                        this.markers.push(marker);

                    }
                    resolve(this.markers);
                } else {
                    let canvas = [];
                    for (let i = 0; i < locations.length; i++) {

                        let img = new Image();
                        let count = locations[i].count;
                        if (!count || count <= 9) {
                            img.src = "assets/clusters/m1.png";
                        }
                        if (count > 10 && count <= 99) {
                            img.src = "assets/clusters/m2.png";
                        }
                        if (count > 100 && count <= 999) {
                            img.src = "assets/clusters/m3.png";
                        }
                        if (count > 1000 && count <= 9999) {
                            img.src = "assets/clusters/m4.png";
                        }
                        if (count > 10000) {
                            img.src = "assets/clusters/m5.png";
                        }

                        img.onload = function () {
                            canvas[i] = document.createElement('canvas');
                            canvas[i].width = img.width;
                            canvas[i].height = img.height;

                            var context = canvas[i].getContext('2d');


                            context.fillStyle = 'white';
                            context.drawImage(img, 0, 0, img.width, img.height);
                            context.font = 'bolder 12pt arial';
                            context.textAlign = "center";
                            context.textBaseline = "middle";
                            if (!count) {
                                context.fillText("1", img.width / 2, img.height / 2, img.width);
                            } else {
                                context.fillText(count, img.width / 2, img.height / 2, img.width);
                            }


                            let markerOptionsCluster: MarkerOptions = {
                                position: locations[i].location,
                                icon: canvas[i].toDataURL(),
                                disableAutoPan: false
                            }

                            __this.markers.push(markerOptionsCluster);

                            map.addMarker(markerOptionsCluster).then((marker: Marker) => {
                                marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe((marker) => {
                                    marker.getPosition((latlng) => {
                                        map.setCenter(latlng);
                                        let newZoom = zoom + 2;
                                        map.setZoom(newZoom);
                                    })

                                })
                            });
                        };

                    }
                }
                resolve(this.markers);
            })
        })
    }
}

