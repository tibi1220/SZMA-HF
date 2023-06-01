import fs from 'fs';
import path from 'path';

import type { Panel } from './panel';
import type { Detailed } from './detailed';

export default function parseAboutData(panel: Panel, detailed: Detailed) {
  const keys = Object.keys(panel);

  const filtered = keys.filter(key => Object.hasOwn(detailed, key)).reverse();

  const about = {
    dates: filtered,
    count: {
      inverter: 8,
      panel: 4,
    },
  };

  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(process.cwd(), 'static', 'about.json'),
      JSON.stringify(about),
      'utf8',
      err => {
        if (err) {
          console.error(err);
          reject(err);
        }

        resolve(about);
      }
    );
  });
}
