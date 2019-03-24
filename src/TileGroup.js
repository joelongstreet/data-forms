import React, { Component } from 'react';
import { extent } from 'd3';
import { chunk, uniq } from 'lodash';

import Tile from './Tile';
import { convertUnitsToPixels } from './util';


class TileGroup extends Component {
  constructor(props) {
    super(props);
    this.subProps = { dataSets: [] };
  }

  componentDidMount() {
    this.setSubProps();
  }

  componentDidUpdate() {
    this.setSubProps();
  }

  setSubProps() {
    const { props: p } = this;
    this.subProps = { ...p };

    // break the stringed datasets into rows and columns
    const dataSets = p
      .datum
      .split('\n')
      .map(ds => chunk(ds.split(','), 2));

    // list all possible ranges for the y column
    const yDataRange = uniq(
      dataSets.map(ds => (
        ds.map(d => d[1])
      )).flat(),
    );

    // find the highest and lowest values for the y value
    const yDataDomain = extent(yDataRange);

    Object.assign(this.subProps, {
      dataSets,
      yDataDomain,
      cellWidth: convertUnitsToPixels(p.cellWidth, p.units),
      cellHeight: convertUnitsToPixels(p.cellHeight, p.units),
      throughHoleRadius: convertUnitsToPixels(p.throughHoleRadius, p.units),
      throughHoleX: convertUnitsToPixels(p.throughHoleX, p.units),
      throughHoleY: convertUnitsToPixels(p.throughHoleY, p.units),
    });
    this.subProps.width = this.subProps.cellWidth * this.subProps.datum.length;
  }

  render() {
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
            data={data}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            node={this.node}
            shapeSideCount={this.subProps.shapeSideCount}
            shapeType={this.subProps.shapeType}
            throughHoleExists={this.subProps.throughHoleExists}
            throughHoleRadius={this.subProps.throughHoleRadius}
            throughHoleX={this.subProps.throughHoleX}
            throughHoleY={this.subProps.throughHoleY}
            xOffset={i * this.subProps.cellWidth}
            yDataDomain={this.subProps.yDataDomain}
            yOffset={0}
          />
        ))}
      </svg>
    );
  }
}

export default TileGroup;
