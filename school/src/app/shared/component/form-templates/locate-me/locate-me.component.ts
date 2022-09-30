import { Component, OnInit, Input } from '@angular/core';
import { GeoLocationService } from '@app/shared/services/geo-location.service';

@Component({
  selector: 'locate-me',
  templateUrl: './locate-me.component.html',
  styleUrls: ['./locate-me.component.css']
})
export class LocateMeComponent implements OnInit {

  @Input() icon = "room"

  public result

  constructor() { }

  ngOnInit() {
  }

  locateMeClicked() {
    this.getGeoLocation()
  }

  getGeoLocation() {
    console.log("Get location called")
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          console.log("Your location is")
          console.log(position)
          this.result = {
            isSuccess: true,
            data: position
          }
        },
        error => {
          let message = "Unable to find location"
          switch (error.code) {
            case 1: {
              message = "Permission Denied"
              console.log('Permission Denied');
              break;
            }
            case 2: {
              message = "Location Unavailable"
              console.log('Location Unavailable');
              break;
            }
            case 3: {
              message = "Timeout"
              console.log('Timeout');
              break;
            }
          }

          this.result = {
            isSuccess: false,
            data: message
          }
        }
      );
    };
  }


  lat = 43.879078;
  lng = -103.4615581;
  selectedMarker;
  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    { lat: 22.33159, lng: 105.63233, alpha: 1 },
    { lat: 7.92658, lng: -12.05228, alpha: 1 },
    { lat: 48.75606, lng: -118.859, alpha: 1 },
    { lat: 5.19334, lng: -67.03352, alpha: 1 },
    { lat: 12.09407, lng: 26.31618, alpha: 1 },
    { lat: 47.92393, lng: 78.58339, alpha: 1 }
  ];

  addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 0.4 });
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

}
