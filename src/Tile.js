import { Component } from 'react';
import { select } from 'd3-selection';
import * as d3 from 'd3';

import * as Styles from './Styles';
import {
  convertDegreesToRadians,
  getCoordsFromRadiansAndRadius,
} from './util';


// surrounding polygons can "look" off center.
// rotate each polygon a certain number of degrees
// dependent on the number of sides
const rotationMap = {
  3: -90, 4: 45, 5: -18, 6: 0, 7: 38.5, 8: 0,
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
      cellSize,
      curveType,
      data,
      dataDomain,
      lineType,
      forceClose,
      shapeSideCount,
      shapeType,
      throughHoleExists,
      throughHoleRadius,
      throughHoleX,
      throughHoleY,
      xOffset,
      yOffset,
    } = this.props;

    const halfSquared = ((cellSize / 2) ** 2) * 2;

    // create a multidimensional array to give each item an x value (the indece)
    const datum = data.map((d, i) => [i, d]);
    if (forceClose) datum.push([data.length, data[0]]);

    // scale the x axis around a circle
    // and to the length of the data set
    const xDomainMax = forceClose ? datum.length - 1 : datum.length;

    let xF;
    let yF;
    let lineF;

    if (lineType === 'linear') {
      xF = d3.scaleLinear()
        .range([0, cellSize])
        .domain([0, xDomainMax]);

      yF = d3.scaleLinear()
        .range([0, cellSize])
        .domain(dataDomain);

      lineF = d3.line()
        .x(d => xF(d[0]))
        .y(d => yF(d[1]));
    } else if (lineType === 'radial') {
      xF = d3.scaleTime()
        .range([0, 2 * Math.PI])
        .domain([0, xDomainMax]);

      yF = d3.scaleLinear().range([
        cellSize / 5,
        Math.sqrt(halfSquared) * 0.5,
      ]).domain(dataDomain);

      lineF = d3.lineRadial()
        .angle(d => xF(d[0]))
        .radius(d => yF(d[1]));
    }

    lineF.curve(d3[curveType]);

    // draw the group for this tile which contains all other shapes
    this.group
      .attr(
        'transform',
        `translate(${xOffset}, ${yOffset})`,
      )
      .attr('width', cellSize)
      .attr('height', cellSize);

    // optionally draw a surrounding polygon
    if (shapeType === 'surround') {
      const rotation = rotationMap[shapeSideCount] || 0;
      const vertices = getVerticesForSurroundingPolygon(shapeSideCount, cellSize / 2);

      if (shapeSideCount === 2) {
        this.group.append('circle')
          .attr('fill', 'none')
          .attr('stroke', Styles.colors[2])
          .attr('r', cellSize / 2)
          .attr('cx', cellSize / 2)
          .attr('cy', cellSize / 2)
          .attr('stroke-width', 1);
      } else {
        this.group
          .append('path')
          .datum(vertices)
          .attr('fill', 'none')
          .attr('stroke', Styles.colors[2])
          .attr('stroke-width', 1)
          .attr('transform', `rotate(${rotation}, ${cellSize / 2}, ${cellSize / 2})`)
          .attr('d', polygonSurroundLineFunction);
      }
    }

    const translate = lineType === 'radial' ? [cellSize / 2, cellSize / 2] : [0, 0];
    this.group
      .append('path')
      .attr(
        'transform',
        `translate(${translate[0]}, ${translate[1]})`,
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
