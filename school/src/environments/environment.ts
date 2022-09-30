// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:44365/',
  ftpUrl: 'http://localhost:44365/',
  //apiUrl: 'http://webapi.stug.in/',
  //ftpUrl: 'http://webapi.stug.in/',
};


export { MasterData } from 'assets/data/master-data';
export { defaultMenuListAndEntitlements } from 'assets/data/menu';
export { quotes } from 'assets/data/quotes';

import * as _moment from 'moment';
export const moment = _moment;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
