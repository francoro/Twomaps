import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps.service';
import { GoogleMapsCluster } from '../../providers/google-maps-cluster.service';
import { NavParams, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PropertiesService } from '../../providers/properties.service';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
declare var navigator: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class ClustersPage {
  params: any = { test: "asd" };
  @ViewChild('mapa') mapElement: ElementRef;
  openPreviewProperty: boolean = false;
  propertyId: any;
  property: any;
  propertyReady: any = false;
  busy: boolean = false;
  isWatching: boolean = false;
  currentMap: any;
  watch: any;
  marker: any;



  constructor(public platform: Platform, private storage: Storage, private propertiesService: PropertiesService, private navCtrl: NavController, private navParams: NavParams, public maps: GoogleMapsProvider, public mapCluster: GoogleMapsCluster) {
    this.params = {
      propertyType: 1,
      transaction_type: 2
    }
  }

  ionViewDidLoad(): void {

    this.platform.ready().then(() => {

      this.storage.set("parameters", this.params);

      let __this = this;

      let mapLoaded = this.maps.init(this.mapElement.nativeElement).then((map) => {


        map.on(GoogleMapsEvent.CAMERA_MOVE).subscribe(data => {
          let zoom = data.zoom;
          console.log("zoom", zoom)
          var latLngBounds = map.getVisibleRegion();

          console.log("latLngBounds", latLngBounds)
          __this.storage.get('parameters').then((parameters) => {
            console.log("d")
            let NE = latLngBounds.northeast;
            let SW = latLngBounds.southwest;
            parameters.NELat = NE.lat;
            parameters.NELng = NE.lng;
            parameters.SWLat = SW.lat;
            parameters.SWLng = SW.lng;
            if (zoom > 16) {
              console.log(1)
              __this.propertiesService.getMarkers(parameters).then((locations: any) => {
                console.log("loca", locations)

                __this.mapCluster.addCluster(map, locations, false, zoom).then((markers: any) => {
                  console.log("marker", markers)
                })

              })
            } else {
              console.log(2)
              parameters.zoom = parseInt(zoom);
              this.getClusters(parameters, zoom, map);

            }
          })
        });
      });

    });
  }

  getClusters(parameters, zoom, map) {
    this.propertiesService.getClusters(parameters).then((clusters: any) => {
      let clustersArray = [];
      for (let i = 0; i < clusters.length; i++) {
        if (clusters[i].properties) {
          clustersArray.push({ count: String(clusters[i].properties.point_count), location: { lng: clusters[i].geometry.coordinates[0], lat: clusters[i].geometry.coordinates[1] } })
        } else {
          clustersArray.push({ location: { lng: clusters[i].geometry.coordinates[0], lat: clusters[i].geometry.coordinates[1] } })
        }
      }
      this.mapCluster.addCluster(map, clustersArray, true, zoom).then((markers: any) => {
      })
    })
  }


}
