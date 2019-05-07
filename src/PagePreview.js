import React from 'react';
import { times } from 'lodash';

import * as Styles from './Styles';
import { convertUnitsToPixels } from './util';

const scaleFactor = 10;

function PagePreview(props) {
  const {
    cellSize,
    datum,
    isSingleton,
    pageHeight,
    pageWidth,
    units,
  } = props;

  const dataRowCount = isSingleton ? 1 : datum.split('\n').length;
  const s = convertUnitsToPixels(cellSize, units) / scaleFactor;
  const w = convertUnitsToPixels(pageWidth, units) / scaleFactor;
  const h = convertUnitsToPixels(pageHeight, units) / scaleFactor;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        border: `1px solid ${Styles.colors[1]}`,
        width: w,
        height: h,
      }}
    >
      {times(dataRowCount, i => (
        <div
          key={i}
          style={{
            width: s,
            height: s,
            border: `1px solid ${Styles.colors[6]}`,
            boxSizing: 'border-box',
            float: 'left',
            margin: 1,
          }}
        />
      ))}
    </div>
  );
}

export default PagePreview;
