import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor() { }  

  getGeoLocation(result){
    console.log("Get location called")
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              console.log("Your location is")
              console.log(position)
              result = {
                      isSuccess: true,
                      data: position
              }
          },
          error => {
            let message = "Unable to find location"
              switch (error.code) {
                  case 1:{
                      message = "Permission Denied"
                      console.log('Permission Denied');
                      break;
                    }
                  case 2:{
                      message = "Location Unavailable"
                      console.log('Location Unavailable');
                      break;
                  }
                  case 3:{
                      message = "Timeout"
                      console.log('Timeout');
                      break;
                  }
              }

              result = {
                isSuccess: false,
                data: message
        }
          }
      );
  };
  }
}
