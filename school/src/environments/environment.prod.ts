export const environment = {
  production: true,
  //apiUrl: 'http://localhost:44365/',
  //ftpUrl: 'http://localhost:44365/',
  apiUrl: 'http://webapi.stug.in/',
  ftpUrl: 'http://webapi.stug.in/',
};

export { MasterData } from 'assets/data/master-data';
export { defaultMenuListAndEntitlements } from 'assets/data/menu';
export { quotes } from 'assets/data/quotes';

import * as _moment from 'moment';
export const moment = _moment;