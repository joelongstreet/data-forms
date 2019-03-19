import { Component } from 'react';
import { select } from 'd3-selection';
import * as d3 from 'd3';

import SettingsContext from './Settings.context';
import * as Styles from './Styles';

const line = d3.line()
  .x((d) => d[0])
  .y((d) => d[1])
  .curve(d3.curveLinear);

function convertToRadians(degrees) {
  return (degrees * Math.PI) / 180;
};

function getXCoord (angle, radius) {
  return Math.round(Math.cos(angle) * radius) + radius;
};

function getYCoord (angle, radius) {
  return Math.round(Math.sin(angle) * radius) + radius;
};

function getVertices(shapeSideCount, radius) {
  const vertices = [...Array(shapeSideCount)].map((x, i) => {
    const angle = (360 / shapeSideCount) * i;
    const radian = convertToRadians(angle);

    return [
      getXCoord(radian, radius),
      getYCoord(radian, radius)
    ];
  }); 

  vertices.push(vertices[0]);
  return vertices;
}



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
    
    const vertices = getVertices(shapeSideCount, cellWidth/2);
    this.group
      .append('path')
      .datum(vertices)
      .attr('fill', 'none')
      .attr('stroke', Styles.colors[2])
      .attr('stroke-width', 1)
      .attr('transform', `rotate(45, ${cellWidth/2}, ${cellHeight/2})`)
      .attr('d', line);
    
    if (throughHoleExists) {
      this.group.append('circle')
        .attr('cx', throughHoleX)
        .attr('cy', throughHoleY)
        .attr('fill', 'none')
        .attr('stroke', Styles.colors[2])
        .attr('r', throughHoleRadius)
        .attr('stroke-width', 1);
    }
  }

  render() { return ''; }
}

Tile.contextType = SettingsContext;
export default Tile;