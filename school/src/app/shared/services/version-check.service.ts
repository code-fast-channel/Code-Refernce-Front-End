import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root' // because we need to detect changes across modules
})
export class VersionCheckService {

    private environment = environment
    private localVersion = "0.0.0"

    constructor(private http: HttpClient) {}

    /**
     * Checks in every set frequency the version of frontend application
     * @param url
     * @param {number} frequency - in milliseconds
     */
    public initVersionCheck(url, frequency = 1000 * 60 * 12) {
      this.checkVersion(url)
    }

    /**
     * Will do the call and check if the hash has changed or not
     * @param url
     */
    private checkVersion(url) {
        // timestamp these requests to invalidate caches
        this.http.get(url + '?t=' + new Date().getTime())
            .subscribe(
                (response: any) => {
                    let latestVersion = response.version;
                    let forceUpdate = response.forceUpdate;

                    // If new version, do something
                    if (latestVersion != this.localVersion && forceUpdate) {
                        window.location.reload(true)
                    }
                },
                (err) => {
                    console.error(err, "Oops! Unable to sync with server.");
                }
            );
    }
}