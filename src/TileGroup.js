import React, { Component } from 'react';
import { extent } from 'd3';
import { uniq } from 'lodash';

import Tile from './Tile';
import { convertUnitsToPixels } from './util';
import * as Styles from './Styles';


class TileGroup extends Component {
  constructor(props) {
    super(props);
    this.subProps = { dataSets: [] };
  }

  setSubProps() {
    const { props: p } = this;
    this.subProps = { ...p };

    // break the stringed datasets into rows and columns
    const dataSets = p
      .datum
      .split('\n')
      .map((ds) => {
        let row = ds.split(',');
        if (p.isDramatic) {
          row = row.reduce((r, a) => r.concat(a, 0), []);
        }
        return row.map(d => Number(d));
      });

    // find the highest and lowest values for the data set
    const dataDomain = extent(
      uniq(
        dataSets.flat(),
      ),
    ).reverse();

    Object.assign(this.subProps, {
      dataSets,
      dataDomain,
      cellSize: convertUnitsToPixels(p.cellSize, p.units),
      curveOffsetX: convertUnitsToPixels(p.curveOffsetX, p.units),
      curveOffsetY: convertUnitsToPixels(p.curveOffsetY, p.units),
      etchWidth: convertUnitsToPixels(p.etchWidth, p.units),
      throughHoleRadius: convertUnitsToPixels(p.throughHoleRadius, p.units),
      throughHoleX: convertUnitsToPixels(p.throughHoleX, p.units),
      throughHoleY: convertUnitsToPixels(p.throughHoleY, p.units),
    });
    this.subProps.height = (
      (this.subProps.cellSize * this.subProps.dataSets.length)
      + (Styles.previewVerticalCellPadding * this.subProps.dataSets.length)
    );
    this.subProps.width = this.subProps.cellSize;
  }

  render() {
    this.setSubProps();
    return (
      <svg
        ref={(node) => { this.node = node; }}
        width={this.subProps.width}
        height={this.subProps.height}
        style={{ display: 'block', margin: 'auto' }}
      >
        {this.subProps.dataSets.map((data, i) => (
          <Tile
            cellSize={this.subProps.cellSize}
            curveOffsetX={this.subProps.curveOffsetX}
            curveOffsetY={this.subProps.curveOffsetY}
            curveScale={this.subProps.curveScale}
            curveType={this.subProps.curveType}
            data={data}
            dataDomain={this.subProps.dataDomain}
            effectType={this.subProps.effectType}
            etchWidth={this.subProps.etchWidth}
            forceClose={this.subProps.forceClose}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            lineType={this.subProps.lineType}
            node={this.node}
            shapeSideCount={this.subProps.shapeSideCount}
            showSurround={this.subProps.showSurround}
            throughHoleExists={this.subProps.throughHoleExists}
            throughHoleRadius={this.subProps.throughHoleRadius}
            throughHoleX={this.subProps.throughHoleX}
            throughHoleY={this.subProps.throughHoleY}
            xOffset={0}
            yOffset={i * this.subProps.cellSize + Styles.previewVerticalCellPadding * (i + 1)}
          />
        ))}
      </svg>
    );
  }
}

export default TileGroup;
