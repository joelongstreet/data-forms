import { Component } from 'react';
import { select } from 'd3-selection';
import * as d3 from 'd3';

import scaleRadial from './d3/scale-radial';
import * as Styles from './Styles';
import {
  convertDegreesToRadians,
  getCoordsFromRadiansAndRadius,
} from './util';


// surrounding polygons can "look" off center.
// rotate each polygon a certain number of degrees
// dependent on the number of sides
const rotationMap = {
  3: -90, 4: 45, 5: -18, 6: 0, 7: 13, 8: 1,
};

// straight lines to connect the vertices of a polygon
const polygonSurroundLineFunction = d3
  .line()
  .x(d => d[0])
  .y(d => d[1])
  .curve(d3.curveLinearClosed);

// return a [[x, y], [x,y]...] list of points to create the
// vertices of a surrounding polygon
function getVerticesForSurroundingPolygon(shapeSideCount, radius) {
  const vertices = [...Array(shapeSideCount)].map((x, i) => {
    const angle = (360 / shapeSideCount) * i;
    const radian = convertDegreesToRadians(angle);

    return getCoordsFromRadiansAndRadius(radian, radius);
  });

  vertices.push(vertices[0]);
  return vertices;
}


class Tile extends Component {
  constructor(props) {
    super(props);
    this.updateSvg = this.updateSvg.bind(this);
  }

  componentDidUpdate() {
    // I don't know why I can't put this in the component did mount...
    const { node } = this.props;
    if (!this.group) {
      this.group = select(node).append('g');
    }

    this.group.selectAll('*').remove();
    this.updateSvg();
  }

  updateSvg() {
    const {
      cellWidth,
      cellHeight,
      data,
      dataDomain,
      shapeSideCount,
      shapeType,
      throughHoleExists,
      throughHoleRadius,
      throughHoleX,
      throughHoleY,
      xOffset,
      yOffset,
    } = this.props;

    // create a multidimensional array to give each item an x value (the indece)
    const datum = data.map((d, i) => [i, d]);

    const halfSquared = ((cellWidth / 2) ** 2) * 2;

    // scale the x axis around a circle
    // and to the length of the data set
    const xF = d3.scaleTime()
      .range([0, 2 * Math.PI])
      .domain([0, data.length]);

    // constrain the y axis to the passed domain
    const yF = scaleRadial().range([
      cellWidth / 5,
      Math.sqrt(halfSquared) * 0.5,
    ]).domain(dataDomain);

    const lineF = d3.lineRadial()
      .angle(d => xF(d[0]))
      .radius(d => yF(d[1]))
      .curve(d3.curveBasisClosed);

    // draw the group for this tile which contains all other shapes
    this.group
      .attr(
        'transform',
        `translate(${xOffset}, ${yOffset})`,
      )
      .attr('width', cellWidth)
      .attr('height', cellHeight);

    // optionally draw a surrounding polygon
    if (shapeType === 'surround') {
      const rotation = rotationMap[shapeSideCount] || 0;
      const vertices = getVerticesForSurroundingPolygon(shapeSideCount, cellWidth / 2);

      if (shapeSideCount === 2) {
        this.group.append('circle')
          .attr('fill', 'none')
          .attr('stroke', Styles.colors[2])
          .attr('r', cellWidth / 2)
          .attr('cx', cellWidth / 2)
          .attr('cy', cellWidth / 2)
          .attr('stroke-width', 1);
      } else {
        this.group
          .append('path')
          .datum(vertices)
          .attr('fill', 'none')
          .attr('stroke', Styles.colors[2])
          .attr('stroke-width', 1)
          .attr('transform', `rotate(${rotation}, ${cellWidth / 2}, ${cellHeight / 2})`)
          .attr('d', polygonSurroundLineFunction);
      }
    }

    this.group
      .append('path')
      .attr(
        'transform',
        `translate(${(cellWidth / 2)}, ${(cellWidth / 2)})`,
      )
      .datum(datum)
      .attr('fill', 'none')
      .attr('stroke', Styles.colors[2])
      .attr('d', lineF)
      .style('stroke-linecap', 'round')
      .style('stroke-linejoin', 'round')
      .attr('stroke-width', 3);

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

export default Tile;
