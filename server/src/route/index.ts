import parseDateMW from '../middleware/parseDate';

import getSinglePanel from '../middleware/getSinglePanel';

import getSingleDetailed from '../middleware/getSingleDetailed';

import getAbout from '../middleware/getAbout';

import sendDataMW from '../middleware/sendData';

import type { Express } from 'express';

export default function route(app: Express) {
  app.get(
    '/detailed/:date', //
    parseDateMW(),
    getSingleDetailed(),
    sendDataMW()
  );
  app.get(
    '/panel/:date', //
    parseDateMW(),
    getSinglePanel(),
    sendDataMW()
  );
  app.get(
    '/about', //
    getAbout(),
    sendDataMW()
  );
}
