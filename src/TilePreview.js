import React, { Component } from 'react';
import * as d3 from 'd3';
import { withFauxDOM } from 'react-faux-dom';
import { uniq } from 'lodash';

import { convertUnitsToPixels } from './util';
import * as Styles from './Styles';
import Tile from './Tile';


const dontRenderOnUpdate = [
  'animateFauxDOM',
  'connectFauxDOM',
  'drawFauxDOM',
  'isAnimagiontFauxDOM',
  'shapePreview',
  'stopAnimatingFauxDOM',
];

class TilePreview extends Component {
  constructor(props) {
    super(props);
    this.renderD3 = this.renderD3.bind(this);
  }

  componentDidMount() {
    this.renderD3();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    // fauxDom attaches items to props
    // manually check props for update so we can ignore
    // any magically added fauxDom props, avoids infinite
    // redraw loops
    const render = Object.keys(props).some((key) => {
      if (dontRenderOnUpdate.includes(key)) return false;
      return props[key] !== prevProps[key];
    });

    if (render) this.renderD3();
  }

  renderD3() {
    const { props } = this;

    // setup the faux dom and draw the svg if one doesn't already exist
    const faux = props.connectFauxDOM('div', 'shapePreview');
    let svg = d3.select(faux).select('svg');
    if (svg.empty()) {
      svg = d3.select(faux).append('svg');
    }

    const {
      curveRotation,
      curveScaleX,
      curveScaleY,
      curveType,
      datum,
      effectType,
      isDramatic,
      lineType,
      forceClose,
      shapeSideCount,
      showSurround,
      throughHoleExists,
      units,
    } = props;

    // the props will be converted to pixel units
    let {
      cellSize,
      curveOffsetX,
      curveOffsetY,
      etchWidth,
      throughHoleRadius,
      throughHoleX,
      throughHoleY,
    } = props;

    cellSize = convertUnitsToPixels(cellSize, units);
    curveOffsetX = convertUnitsToPixels(curveOffsetX, units);
    curveOffsetY = convertUnitsToPixels(curveOffsetY, units);
    etchWidth = convertUnitsToPixels(etchWidth, units);
    throughHoleRadius = convertUnitsToPixels(throughHoleRadius, units);
    throughHoleX = convertUnitsToPixels(throughHoleX, units);
    throughHoleY = convertUnitsToPixels(throughHoleY, units);

    // break the stringed datasets into rows and columns
    const dataSets = datum
      .split('\n')
      .map((ds) => {
        let row = ds.split(',');
        if (isDramatic) {
          row = row.reduce((r, a) => r.concat(a, 0), []);
        }
        return row.map(d => Number(d));
      });

    // find the highest and lowest values for the data set
    const yDomain = d3.extent(
      uniq(
        dataSets.flat(),
      ),
    );

    // reverse the data domain when displaying linearly to
    // make the data feel right side up
    if (lineType === 'linear') yDomain.reverse();

    // determine the total height of the SVG
    const height = (
      (cellSize * dataSets.length)
      + (Styles.previewVerticalCellPadding * dataSets.length)
    );

    svg
      .attr('style', { display: 'block', margin: 'auto' })
      .attr('width', cellSize)
      .attr('height', height);

    svg.selectAll('*').remove();

    dataSets.map((data, i) => {
      const xOffset = 0;
      const yOffset = i * cellSize + Styles.previewVerticalCellPadding * (i + 1);
      const group = svg.append('g');
      return new Tile({
        cellSize,
        curveOffsetX,
        curveOffsetY,
        curveRotation,
        curveScaleX,
        curveScaleY,
        curveType,
        data,
        group,
        effectType,
        etchWidth,
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
      });
    });

    props.drawFauxDOM();
  }

  render() {
    const { shapePreview } = this.props;
    return (
      <div>{shapePreview}</div>
    );
  }
}

const FauxDom = withFauxDOM(TilePreview);

export default FauxDom;
