import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { LuchtKwaliteitApiService } from '../lucht-kwaliteit-api.service';
import { GeometryEnvelope } from '../geometry-envelope';

@Component({
  selector: 'app-routemap',
  templateUrl: './routemap.component.html',
  styleUrls: ['./routemap.component.css']
})
export class RoutemapComponent implements OnInit {
  // Antwerpen
  latitude: number = 51.226;
  longitude: number = 4.406;
  zoom: number = 15;

  @ViewChild('originInput', { static: false })
  public originInput: ElementRef;
  @ViewChild('destinationInput', { static: false })
  public destinationInput: ElementRef;

  map: google.maps.Map;
  directionsService: google.maps.DirectionsService;
  directionsDisplay: google.maps.DirectionsRenderer;

  originPlaceId: string;
  destinationPlaceId: string;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private luchtkwaliteitApi: LuchtKwaliteitApiService
  ) { }

  ngOnInit() {
  }

  onMapReady(map: google.maps.Map) {
    this.map = map;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map,
      draggable: true
    });

    this.setupLuchtkwaliteitLayer();

    // https://developers.google.com/maps/documentation/javascript/events
    this.map.addListener('tilesloaded', () => {
      // Kan ook na idle event
      this.loadDataLayer();
    });

    this.mapsAPILoader.load().then(() => {
      this.setupRouteInput(this.originInput.nativeElement, "ORIG");
      this.setupRouteInput(this.destinationInput.nativeElement, "DEST");
    });
  }

  loadDataLayer(): void {
    let mapBounds = this.map.getBounds();
    if (mapBounds) {
      let geometryEnvelop = GeometryEnvelope.createGeometryEnvelopeFromLatLngBounds(mapBounds);
      console.log(`Load DataLayer binnen ${geometryEnvelop}`);
      this.luchtkwaliteitApi.getLuchtkwaliteitWithinGeometry(geometryEnvelop).subscribe({
        next: (result) => {
          console.log(result);
          this.map.data.addGeoJson(result);
        }
      });
    }
  }

  setupLuchtkwaliteitLayer() {
    this.map.data.setStyle((feature) => {
      let GRIDCODE = feature.getProperty('GRIDCODE');
      let color = this.calculateColorFromGridcode(GRIDCODE);
      // console.log('color: '+color);
      return {
        fillColor: color,
        strokeWeight: 0,
        strokeColor: color,
        fillOpacity: 0.3
      };
    });
  }

  calculateColorFromGridcode(gridcode: number): string {
    // gridcode: 12 tem 123, 224
    // colorcode: rgb(0,255,0) tot rgb(255,255,0) tot rgb(255,0,0), green tot yellow tot red
    const helftRange = (123 - 12) / 2;
    let colorcode = Math.round((gridcode - 12 - helftRange) / helftRange * 255);
    // console.log(`gridcode: ${gridcode}, colorcode: ${colorcode}`);
    return "rgb(" +
      Math.max(0, Math.min(255, 255 + colorcode))
      + ","
      + Math.max(0, Math.min(255, 255 - colorcode))
      + ",0)";
  }

  setupRouteInput(inputElement: ElementRef["nativeElement"], mode: string) {
    //https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-directions
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputElement);

    let autocomplete = new google.maps.places.Autocomplete(inputElement, {
      // Specify just the place data fields that you need.
      fields: ["place_id"]
    });

    // Bias the results to the map's viewport, even while that viewport changes.
    autocomplete.bindTo('bounds', this.map);

    autocomplete.setComponentRestrictions({
      country: 'be'
    });

    this.setupInputPlaceChangedListener(autocomplete, mode);
  };

  setupInputPlaceChangedListener(autocomplete: google.maps.places.Autocomplete, mode: string) {
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        if (!place.place_id) {
          window.alert('Please select an option from the dropdown list.');
          return;
        }
        if (mode === 'ORIG') {
          this.originPlaceId = place.place_id;
        } else {
          this.destinationPlaceId = place.place_id;
        }
        this.route();
      });
    });
  };

  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    this.directionsService.route(
      {
        origin: { 'placeId': this.originPlaceId },
        destination: { 'placeId': this.destinationPlaceId },
        travelMode: google.maps.TravelMode.WALKING
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
          // this.map.data.
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  };

}
