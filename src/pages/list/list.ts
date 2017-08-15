import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})



export class MapPage implements AfterViewInit {
  latitud: any;
  longitud: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, public platform: Platform) {

  }

  ngAfterViewInit() {
    this.loadMap();
  }

  remove() {

  }

  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>


    // create a new map by passing HTMLElement
    let elemento = document.getElementById('map23');

    let mapDetail: GoogleMap = this.googleMaps.create(elemento);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    mapDetail.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
        // create LatLng object

        let latlong: LatLng = new LatLng(-38.01667, -57.51667);

        // create CameraPosition
        let position: CameraPosition = {
          target: latlong,
          zoom: 18,
          tilt: 30
        };

        // move the map's camera to position
        mapDetail.moveCamera(position);


        let markerOptions: MarkerOptions = {
          position: latlong
        };

        const marker = mapDetail.addMarker(markerOptions)
          .then((marker: Marker) => {
          });





      });



  }

}