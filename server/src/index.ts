import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import parse from './parser';
import route from './route';

parse()
  .then(parsed => {
    if (!parsed) {
      process.exit(-1);
    }
  })
  .then(() => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('static'));

    route(app);

    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  });
