import React, { Component } from 'react';
import { select } from 'd3-selection';

import { convertUnitsToPixels } from './util';
import SettingsContext from './Settings.context';


class Tile extends Component {
  constructor(props) {
    super(props);
    this.createSvg = this.createSvg.bind(this);
  }

  componentDidMount() {
    this.createSvg();
  }

  componentDidUpdate() {
    this.createSvg();
  }

  createSvg() {
    const { node, context } = this;
    const {
      units,
      shapeSideCount,
      cellWidth,
      cellHeight,
      throughHoleExists,
      throughHoleRadius,
      throughHoleX,
      throughHoleY,
    } = context.state;

    select(node).selectAll('*').remove();

    select(node)
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', convertUnitsToPixels(cellWidth))
      .attr('height', convertUnitsToPixels(cellHeight))
      .attr('fill', 'none')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('stroke', 'red')
      .attr('stroke-width', 2);
    
    if (throughHoleExists) {
      select(node).append('circle')
        .attr(
          'transform',
          `translate(${convertUnitsToPixels(throughHoleX)}, ${convertUnitsToPixels(throughHoleY)})`
        )
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('r', convertUnitsToPixels(throughHoleRadius))
        .attr('stroke-width', 2);
    }
  }

  render() {
    const { context } = this;
    const { cellWidth, cellHeight } = context.state;
    const width = convertUnitsToPixels(cellWidth);
    const height = convertUnitsToPixels(cellHeight);

    return <div style={{
      width,
      height,
      float: 'left',
      marginRight: 10
    }}>
      <svg ref={node => this.node = node}
        width={width} height={height}>
      </svg>
    </div>;
  }
}

Tile.contextType = SettingsContext;
export default Tile;