import React, { Component } from 'react';
import { extent } from 'd3';
import { uniq } from 'lodash';

import Tile from './Tile';
import { convertUnitsToPixels } from './util';


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
    );

    Object.assign(this.subProps, {
      dataSets,
      dataDomain,
      cellWidth: convertUnitsToPixels(p.cellWidth, p.units),
      cellHeight: convertUnitsToPixels(p.cellHeight, p.units),
      throughHoleRadius: convertUnitsToPixels(p.throughHoleRadius, p.units),
      throughHoleX: convertUnitsToPixels(p.throughHoleX, p.units),
      throughHoleY: convertUnitsToPixels(p.throughHoleY, p.units),
    });
    this.subProps.width = this.subProps.cellWidth * this.subProps.datum.length;
  }

  render() {
    this.setSubProps();
    return (
      <svg
        ref={(node) => { this.node = node; }}
        width={this.subProps.width}
        height={this.subProps.cellHeight}
      >
        {this.subProps.dataSets.map((data, i) => (
          <Tile
            cellWidth={this.subProps.cellWidth}
            cellHeight={this.subProps.cellHeight}
            curveType={this.subProps.curveType}
            data={data}
            dataDomain={this.subProps.dataDomain}
            forceClose={this.subProps.forceClose}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            lineType={this.subProps.lineType}
            node={this.node}
            shapeSideCount={this.subProps.shapeSideCount}
            shapeType={this.subProps.shapeType}
            throughHoleExists={this.subProps.throughHoleExists}
            throughHoleRadius={this.subProps.throughHoleRadius}
            throughHoleX={this.subProps.throughHoleX}
            throughHoleY={this.subProps.throughHoleY}
            xOffset={i * this.subProps.cellWidth}
            yOffset={0}
          />
        ))}
      </svg>
    );
  }
}

export default TileGroup;
