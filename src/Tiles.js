import React, { Component } from 'react';
import * as d3 from 'd3';
import 'd3-selection-multi';
import { withFauxDOM } from 'react-faux-dom';
import { uniq } from 'lodash';

import {
  convertUnitsToPixels,
  svgDocumentMeta,
  svgDownloadContainerId,
} from './util';
import * as Styles from './Styles';
import Tile from './Tile';


const dontRenderOnUpdate = [
  'animateFauxDOM',
  'connectFauxDOM',
  'document',
  'documentPreview',
  'drawFauxDOM',
  'isAnimagiontFauxDOM',
  'stopAnimatingFauxDOM',
];

class Tiles extends Component {
  constructor(props) {
    super(props);
    this.renderD3 = this.renderD3.bind(this);
    this.svg = React.createRef();
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

    // setup the faux doms and draw the svgs if they don't already exist
    const fauxDoc = props.connectFauxDOM('div', 'document');
    const fauxDocPreview = props.connectFauxDOM('div', 'documentPreview');
    let svg = d3.select(fauxDoc).select('svg');
    let svgPreview = d3.select(fauxDocPreview).select('svg');
    if (svg.empty()) svg = d3.select(fauxDoc).append('svg');
    if (svgPreview.empty()) svgPreview = d3.select(fauxDocPreview).append('svg');

    // create a static id so we can reference the inner html of this
    // element for other parts of the application
    d3.select(fauxDoc).attr('id', svgDownloadContainerId);
    d3.select(fauxDocPreview).attr('style', { height: '100%' });

    const {
      curveRotation,
      curveScaleX,
      curveScaleY,
      curveType,
      datum,
      effectType,
      isDramatic,
      isSingleton,
      lineType,
      forceClose,
      shapeSideCount,
      showSurround,
      throughHoleExists,
      units,
    } = props;

    // these props will be converted to pixel units
    let {
      cellSize,
      curveOffsetX,
      curveOffsetY,
      etchWidth,
      pageHeight,
      pageWidth,
      throughHoleRadius,
      throughHoleX,
      throughHoleY,
    } = props;

    cellSize = convertUnitsToPixels(cellSize, units);
    curveOffsetX = convertUnitsToPixels(curveOffsetX, units);
    curveOffsetY = convertUnitsToPixels(curveOffsetY, units);
    etchWidth = convertUnitsToPixels(etchWidth, units);
    pageHeight = convertUnitsToPixels(pageHeight, units);
    pageWidth = convertUnitsToPixels(pageWidth, units);
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

    // determine the total height of the svgPreview
    let svgPreviewHeight = (
      (cellSize * dataSets.length)
      + (Styles.previewVerticalCellPadding * dataSets.length)
    );
    if (isSingleton) svgPreviewHeight = '100%';

    svgPreview.attrs({
      style: { display: 'block', margin: 'auto' },
      width: cellSize,
      height: svgPreviewHeight,
    });

    svg.attrs(
      Object.assign({
        width: '100%',
        height: '100%',
        viewBox: `0 0 ${pageWidth} ${pageHeight}`,
      }, svgDocumentMeta),
    );

    // dump all the svg children whenever we redraw
    svg.selectAll('*').remove();
    svgPreview.selectAll('*').remove();

    const tileOptions = {
      cellSize,
      curveOffsetX,
      curveOffsetY,
      curveRotation,
      curveScaleX,
      curveScaleY,
      curveType,
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
      yDomain,
    };

    // Draw the preview tiles
    dataSets.map((data, i) => {
      const xOffset = 0;
      let yOffset = i * cellSize + Styles.previewVerticalCellPadding * (i + 1);
      if (isSingleton) yOffset = 0;

      const group = svgPreview.append('g');
      const opts = Object.assign({}, tileOptions, {
        xOffset, yOffset, data, group, isPreview: true,
      });
      return new Tile(opts);
    });

    // Draw the hidden tile download document
    const cellsPerRow = Math.floor(pageWidth / cellSize);
    dataSets.map((data, i) => {
      const offsetPlusOne = cellSize * (i + 1);
      let yOffset = Math.floor(offsetPlusOne / pageWidth) * cellSize;
      let xOffset = (i % cellsPerRow) * cellSize;

      if (isSingleton) {
        xOffset = 0;
        yOffset = 0;
      }

      const group = svg.append('g');
      const opts = Object.assign({}, tileOptions, {
        xOffset, yOffset, data, group, isPreview: false,
      });
      return new Tile(opts);
    });

    props.drawFauxDOM();
  }

  render() {
    const { document, documentPreview } = this.props;
    return (
      <React.Fragment>
        {document}
        {documentPreview}
      </React.Fragment>
    );
  }
}

const FauxDom = withFauxDOM(Tiles);

export default FauxDom;
