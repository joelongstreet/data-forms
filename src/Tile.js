import { Component } from 'react';
import { select } from 'd3-selection';

import SettingsContext from './Settings.context';


class Tile extends Component {
  constructor(props) {
    super(props);
    this.updateSvg = this.updateSvg.bind(this);
  }

  componentDidMount() {
    const { node } = this.props;
    this.group = select(node).append('g');
    this.updateSvg();
  }

  componentDidUpdate() {
    this.group.selectAll('*').remove();
    this.updateSvg();
  }

  updateSvg() {
    const {
      cellWidth,
      cellHeight,
      shapeSideCount,
      throughHoleExists,
      throughHoleRadius,
      throughHoleX,
      throughHoleY,
      xOffset,
      yOffset,
    } = this.props;

    this.group
      .attr(
        'transform',
        `translate(${xOffset}, ${yOffset})`
      );

    this.group
      .append('rect')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('fill', 'none')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('stroke', 'red')
      .attr('stroke-width', 2);
    
    if (throughHoleExists) {
      this.group.append('circle')
        .attr('cx', throughHoleX)
        .attr('cy', throughHoleY)
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