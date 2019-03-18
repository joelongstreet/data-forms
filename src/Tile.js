import { Component } from 'react';
import { select } from 'd3-selection';

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
    const { props } = this;

    const {
      cellWidth,
      cellHeight,
      node,
      shapeSideCount,
      throughHoleExists,
      throughHoleRadius,
      throughHoleX,
      throughHoleY,
      xOffset,
      yOffset,
    } = props;

    const group = select(node)
      .append('g')
      .attr('x', xOffset)
      .attr('y', yOffset);

    group
      .append('rect')
      .attr('x', xOffset)
      .attr('y', yOffset)
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('fill', 'none')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('stroke', 'red')
      .attr('stroke-width', 2);
    
    if (throughHoleExists) {
      group.append('circle')
        .attr(
          'transform',
          `translate(${throughHoleX}, ${throughHoleY})`
        )
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('r', throughHoleRadius)
        .attr('stroke-width', 2);
    }
  }

  render() { return ''; }
}

Tile.contextType = SettingsContext;
export default Tile;