import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import getTimeStamps from './getTimeStaps';

export type Power = Array<number>;
export type Detailed = {
  [x: string]: { power: Power; sum: Power; hour: string[] };
};

export default function parseDetailedData() {
  const dirName = path.join(process.cwd(), 'raw', 'detailed');

  const detailed: Detailed = {};

  const files = fs
    .readdirSync(dirName)
    .filter(item => !/(^|\/)\.[^\/\.]/g.test(item));

  const fileCount = files.length;
  let parsedCount = 0;

  const [timeStamps, timeStampCount] = getTimeStamps();

  return new Promise<Detailed>((resolve, reject) => {
    files.forEach(async file => {
      const fileName = path.join(dirName, file);
      const power: Power = [];
      const sum: Power = [];

      let timeIdx = 0;
      let offSet = 0;

      fs.createReadStream(fileName)
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', row => {
          const time = row[1].split(' ')[1];

          while (time != timeStamps[timeIdx++]) {
            if (timeIdx >= timeStampCount) return;

            offSet++;

            power.push(0);
            sum.push(sum.length ? sum[sum.length - 1] : 0);
          }

          const watts = parseFloat(row[2]);

          power.push(watts);
          sum.push(
            sum.length
              ? sum[sum.length - 1] +
                  (watts / 4) * (sum[sum.length - 1] == 0 ? 1 : offSet)
              : 0
          );
          offSet = 1;
        })
        .on('end', () => {
          while (timeIdx++ < timeStampCount) {
            power.push(0);
            sum.push(sum[sum.length - 1]);
          }

          const key = file.replace('.csv', '');

          detailed[key] = { power, sum, hour: timeStamps };

          if (++parsedCount == fileCount) {
            const sorted: Detailed = {};

            Object.keys(detailed)
              .sort()
              .forEach(k => {
                sorted[k] = detailed[k];
              });

            fs.writeFile(
              path.join(process.cwd(), 'static', 'detailed.json'),
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
