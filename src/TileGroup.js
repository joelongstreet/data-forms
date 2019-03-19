import React, { Component } from 'react';

import Tile from './Tile';

import { convertUnitsToPixels } from './util';

class TileGroup extends Component {
  constructor(props) {
    super(props);
    this.subProps = { datum: [] };
  }

  componentDidMount() {
    this.setSubProps();
  }

  componentDidUpdate() {
    this.setSubProps();
  }

  setSubProps() {
    const { props: p } = this;
    this.subProps = {...p};
    Object.assign(this.subProps, {
      cellWidth: convertUnitsToPixels(p.cellWidth, p.units),
      cellHeight: convertUnitsToPixels(p.cellHeight, p.units),
      throughHoleRadius: convertUnitsToPixels(p.throughHoleRadius, p.units),
      throughHoleX: convertUnitsToPixels(p.throughHoleX, p.units),
      throughHoleY: convertUnitsToPixels(p.throughHoleY, p.units),
      datum: p.datum.split('\n'),
    });
    this.subProps.width = this.subProps.cellWidth * this.subProps.datum.length;
  }

  render() {
    return (
      <svg ref={node => {this.node = node;}}
        width={this.subProps.width}
        height={this.subProps.cellHeight}
      >
        {this.subProps.datum.map((data, i) => {
          return <Tile
            cellWidth={this.subProps.cellWidth}
            cellHeight={this.subProps.cellHeight}
            data={data}
            key={i}
            node={this.node}
            shapeSideCount={this.subProps.shapeSideCount}
            throughHoleExists={this.subProps.throughHoleExists}
            throughHoleRadius={this.subProps.throughHoleRadius}
            throughHoleX={this.subProps.throughHoleX}
            throughHoleY={this.subProps.throughHoleY}
            xOffset={i*this.subProps.cellWidth}
            yOffset={0} />;
        })}
      </svg>
    );
  }
}

export default TileGroup;