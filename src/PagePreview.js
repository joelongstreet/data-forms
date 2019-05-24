import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { times } from 'lodash';

import * as Styles from './Styles';
import { convertUnitsToPixels } from './util';

const scaleFactor = 10;

const ruleSets = StyleSheet.create({
  pagePreview: {
    backgroundColor: Styles.colors[0],
    position: 'absolute',
    bottom: 20,
    right: 20,
    border: `1px solid ${Styles.colors[1]}`,
    zIndex: 2,
  },
  cell: {
    backgroundColor: Styles.colors[0],
    border: `1px solid ${Styles.colors[6]}`,
    boxSizing: 'border-box',
    float: 'left',
    margin: '1px 0 0 1px',
  },
});

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
  const width = convertUnitsToPixels(pageWidth, units) / scaleFactor;
  const height = convertUnitsToPixels(pageHeight, units) / scaleFactor;

  return (
    <div className={css(ruleSets.pagePreview)} style={{ width, height }}>
      {times(dataRowCount, i => (
        <div
          key={i}
          className={css(ruleSets.cell)}
          style={{
            width: s - 1,
            height: s - 1,
          }}
        />
      ))}
    </div>
  );
}

export default PagePreview;
