import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { PropertiesService } from './properties.service';
import { GoogleMapsCluster } from './google-maps-cluster.service';
import { Storage } from '@ionic/storage';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
@Injectable()
export class GoogleMapsProvider {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyAR7BNX4_33EoZQxpZzoOUFF188Qh9l2-I";


  constructor(private googleMaps: GoogleMaps, private storage: Storage, public propertiesService: PropertiesService, private mapCluster: GoogleMapsCluster, private platform: Platform) {

  }

  init(mapElement: any): Promise<any> {

    this.mapElement = mapElement;
    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
      /* window['mapInit'] = () => { */

        this.initMap().then((map) => {
          resolve(map);
        });

      /* }

      let script = document.createElement("script");
      script.id = "googleMaps";

      if (this.apiKey) {
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
      }

      document.body.appendChild(script); */

    });

  }



  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {
      this.platform.ready().then(() => {

        // create a new map by passing HTMLElement
        let element: HTMLElement = document.getElementById('mapa');

        let map: GoogleMap = this.googleMaps.create(element);


        map.one(GoogleMapsEvent.MAP_READY).then(
          () => {
            console.log('Map is ready!');

            var posOptions = {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 60000
            };
            //this.geolocation.getCurrentPosition(posOptions).then((position) => {
              // create LatLng object
             // let latlng: LatLng = new LatLng(position.coords.latitude, position.coords.longitude);
              let latlng: LatLng = new LatLng(-38.0054771, -57.5426106);

              // create CameraPosition
              let positionActual: CameraPosition = {
                target: latlng,
                zoom: 15,
                tilt: 30
              };

              // move the map's camera to position
              map.moveCamera(positionActual);
             
              resolve(map);
            /* }).catch(
              (err) => {
                resolve(err);
            });;
 */
          })

      });
    });

  }
}