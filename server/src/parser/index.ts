import parsePanelData from './panel';
import parseDetailedData from './detailed';
import parseAboutData from './about';

export default function parse(): Promise<boolean> {
  return Promise.all([parsePanelData(), parseDetailedData()])
    .then(([panel, detailed]) => parseAboutData(panel, detailed))
    .catch(err => {
      console.error(err);
      return false;
    })
    .then(() => true);
}
