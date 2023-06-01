import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

export type Panel = { [x: string]: number[] };

export default function parsePanelData() {
  const dirName = path.join(process.cwd(), 'raw', 'panel');

  const panel: Panel = {};

  const files = fs
    .readdirSync(dirName)
    .filter(item => !/(^|\/)\.[^\/\.]/g.test(item));

  const length = files.length;
  let i = 0;

  return new Promise<Panel>((resolve, reject) => {
    files.forEach(file => {
      const fileName = path.join(dirName, file);
      const energy: number[] = [];

      fs.createReadStream(fileName)
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', row => {
          energy.push(parseFloat(row[4]) * 1000);
        })
        .on('end', () => {
          const key = file.replace('.csv', '');
          panel[key] = energy;

          if (++i == length) {
            const sorted: Panel = {};

            Object.keys(panel)
              .sort()
              .forEach(k => {
                sorted[k] = panel[k];
              });

            fs.writeFile(
              path.join(process.cwd(), 'static', 'panel.json'),
              JSON.stringify(sorted),
              'utf8',
              err => {
                if (err) {
                  console.error(err);
                  reject(err);
                }

                resolve(sorted);
              }
            );
          }
        });
    });
  });
}
