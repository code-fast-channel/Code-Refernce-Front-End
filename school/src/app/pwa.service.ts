import { Injectable } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { SharedService } from './shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class PWAService {

  apiPrefix = "api/pwa/"

  private pwaKeys = {
    "publicKey": "BOFskauSbxZMir2dOb7ieIYrOjYssw06P7CRpN6r1mAd3FSti5owFOQQ4LAYAIuRqJYdP1-TZHI5ZPtk83AK8n4",
    "privateKey": "vEtKrKvVQUxMNHbZzqa5yZu3R03BkeALxXE3j9YCLTc"
  }

  public promptEvent
  constructor(
    private http: HttpClient,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private sharedService: SharedService
  ) {

    /*
  swUpdate.available.subscribe(event => {
     window.location.reload();
     alert("Application has been automatically updated.")
  });

  window.addEventListener('beforeinstallprompt', event => {
    this.promptEvent = event;
  });
  */
  }


  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.pwaKeys.publicKey
    })
      .then(
        sub => {
          console.log("PWA success")
          console.log(sub)
          this.saveSubscription(sub)
        }
      )
      .catch(
        err => {
          console.error("Could not subscribe to notifications", err)
        }
      );
  }
  
  saveSubscription(sub) {
    let currentUserId = this.sharedService.serializeMongoObjectId(this.sharedService.CurrentUserId())
    
    return this.http.post(environment.apiUrl + this.apiPrefix + "saveSubscription", sub)
    .subscribe(
      (result: any) => {
        console.log(result)
      },
      (error) => {
        console.log(error)
      }
    );
  }

}
