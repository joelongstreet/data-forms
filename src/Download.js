import { notification } from 'antd';
import dayjs from 'dayjs';

import * as Styles from './Styles';
import { svgDownloadContainerId } from './util';

function downloadSvgDocument() {
  const documentContainer = document.getElementById(svgDownloadContainerId);
  const svgDocument = documentContainer.innerHTML;
  const file = `data:application/octet-stream;base64,${window.btoa(svgDocument)}`;

  const timestamp = dayjs().format('YYYY-MM-DDTHH:mm');

  notification.warning({
    message: 'Warning',
    description: 'DataForms outputs cut files as SVG. Before sending to laser cutter, change the document settings to standard or metric units with 72 DPI. If the document is setup properly, the document dimensions in the vector graphics editor will match the dimensions listed on the page tab from DataForms. Cut line strokes will be set to 0.001 inches if using standard units, etch lines set to the specified etch width in DataForms. Cut paths may be invisible on some web browsers. Validate paths in a trdational graphics editor.',
    duration: 0,
    style: {
      backgroundColor: Styles.colors[10],
    },
  });

  const aLink = document.createElement('a');
  aLink.download = `DataForms ${timestamp}.svg`;
  aLink.href = file;
  aLink.dispatchEvent(new window.MouseEvent('click'));
}

export default downloadSvgDocument;
