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
  3: -89, 4: 0, 5: -18, 6: 0, 7: 38.5, 8: 0,
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


function Tile(props) {
  const {
    cellSize,
    curveOffsetX,
    curveOffsetY,
    curveRotation,
    curveScaleX,
    curveScaleY,
    curveType,
    data,
    effectType,
    etchWidth,
    group,
    isPreview,
    lineType,
    forceClose,
    shapeSideCount,
    showSurround,
    throughHoleExists,
    throughHoleRadius,
    throughHoleX,
    throughHoleY,
    xOffset,
    yDomain,
    yOffset,
  } = props;

  const etchColor = isPreview ? Styles.colors[3] : 'black';
  const cutColor = isPreview ? Styles.colors[2] : 'black';
  const cutPathWidth = isPreview ? 1 : 0.1;

  // create a multidimensional array to give each item an x value (the indece)
  const datum = data.map((d, i) => [i, d]);
  if (forceClose) datum.push([data.length, data[0]]);

  // scale x axis to the length of the data set
  const xDomainMax = forceClose ? datum.length - 1 : datum.length;
  const xDomain = [0, xDomainMax];

  let xF;
  let yF;
  let lineF;

  if (lineType === 'linear') {
    xF = d3.scaleLinear()
      .range([0, cellSize * curveScaleX])
      .domain(xDomain);

    yF = d3.scaleLinear()
      .range([0, cellSize * curveScaleY])
      .domain(yDomain);

    lineF = d3.line()
      .x(d => xF(d[0]))
      .y(d => yF(d[1]));
  } else if (lineType === 'radial') {
    xF = d3.scaleTime()
      .range([0, 2 * Math.PI])
      .domain(xDomain);

    yF = d3.scaleLinear().range([
      (cellSize / (curveScaleY * 7)) * curveScaleX,
      cellSize * curveScaleX,
    ]).domain(yDomain);

    lineF = d3.lineRadial()
      .angle(d => xF(d[0]))
      .radius(d => yF(d[1]));
  }

  lineF.curve(d3[curveType]);

  // draw the group for this tile which contains all other shapes
  group.attr(
    'transform',
    `translate(${xOffset}, ${yOffset})`,
  );

  // optionally draw a surrounding polygon
  if (showSurround) {
    const rotation = rotationMap[shapeSideCount] || 0;
    const vertices = getVerticesForSurroundingPolygon(shapeSideCount, cellSize / 2);

    if (shapeSideCount === 2) {
      group.append('circle')
        .attr('fill', 'none')
        .attr('stroke', cutColor)
        .attr('r', cellSize / 2)
        .attr('cx', cellSize / 2)
        .attr('cy', cellSize / 2)
        .attr('stroke-width', cutPathWidth);
    } else {
      group
        .append('path')
        .datum(vertices)
        .attr('fill', 'none')
        .attr('stroke', cutColor)
        .attr('stroke-width', cutPathWidth)
        .attr('transform', `rotate(${rotation}, ${cellSize / 2}, ${cellSize / 2})`)
        .attr('d', polygonSurroundLineFunction);
    }
  }

  const translate = lineType === 'radial' ? [cellSize / 2, cellSize / 2] : [0, 0];
  translate[0] += curveOffsetX;
  translate[1] += curveOffsetY;

  const curvePathWidth = effectType === 'etch' ? etchWidth : cutPathWidth;
  const curveColor = effectType === 'etch' ? etchColor : cutColor;
  const curveTranslationString = `${translate[0]}, ${translate[1]}`;
  const curveRotationString = lineType === 'radial' ? curveRotation : `${curveRotation}, ${cellSize / 2}, ${cellSize / 2}`;

  group
    .append('path')
    .attr(
      'transform',
      `translate(${curveTranslationString}) rotate(${curveRotationString})`,
    )
    .datum(datum)
    .attr('fill', 'none')
    .attr('stroke', curveColor)
    .attr('d', lineF)
    .attr('stroke-width', curvePathWidth);

  if (throughHoleExists) {
    group.append('circle')
      .attr('cx', throughHoleX)
      .attr('cy', throughHoleY)
      .attr('fill', 'none')
      .attr('stroke', cutColor)
      .attr('r', throughHoleRadius / 2) // why?
      .attr('stroke-width', cutPathWidth);
  }

  return group;
}

export default Tile;
