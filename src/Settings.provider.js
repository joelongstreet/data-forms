import React, { Component } from 'react';
import { zipObject, round } from 'lodash';

import { inchesPerCentimenter, centimetersPerInch } from './util';
import SettingsContext from './Settings.context';

const precision = 2;

class SettingsProvider extends Component {
  state = {
    cellSize: 4,
    cellSizeMin: 1,
    cellSizeMax: 10,
    curveScale: 0.5,
    curveOffsetX: 0,
    curveOffsetY: 0.2,
    curveType: 'curveBasisClosed',
    datum: '39,44,58,69,78,86,92,90,82,70,56,43\n22,28,41,57,70,79,84,81,72,58,41,27\n61,65,73,80,86,92,96,96,90,82,71,63\n23,28,31,43,53,59,62,61,55,43,28,25',
    defaultSliderStepSize: 0.01,
    effectType: 'etch',
    isDramatic: true,
    lineType: 'radial',
    pageWidth: 24,
    pageWidthMax: 48,
    pageHeight: 12,
    pageHeightMax: 96,
    shapeSideCount: 4,
    showSurround: true,
    throughHoleExists: true,
    throughHoleRadius: 0.12,
    throughHoleX: 2,
    throughHoleY: 0.5,
    units: 'in',
  }

  getStateKeysWithUnits = () => [
    'defaultSliderStepSize',
    'cellSize', 'cellSizeMin', 'cellSizeMax',
    'throughHoleRadius', 'throughHoleX', 'throughHoleY',
    'pageWidth', 'pageWidthMax', 'pageHeight', 'pageHeightMax',
  ]

  render() {
    const { children } = this.props;

    return (
      <SettingsContext.Provider value={{
        state: this.state,
        setUnits: (unit) => {
          const { state } = this;
          if (state.units !== unit) {
            const factor = unit === 'cm' ? centimetersPerInch : inchesPerCentimenter;

            const keys = this.getStateKeysWithUnits();
            const zipped = zipObject(
              keys,
              keys.map(key => round(state[key] * factor, precision)),
            );
            this.setState(zipped);
          }

          this.setState({ units: unit });
        },
        setDatum: datum => this.setState({ datum }),
        toggleShowSurround: () => {
          const { state } = this;
          const bool = !state.showSurround;
          if (!bool) {
            this.setState({
              throughHoleExists: false,
            });
          }
          this.setState({
            showSurround: bool,
          });
        },
        setEffectType: effectType => this.setState({ effectType }),
        setShapeSideCount: shapeSideCount => this.setState({
          shapeSideCount,
        }),
        setCellSize: (width) => {
          const s = round(width, 2);
          this.setState({ cellSize: s });
        },
        setCurveType: (curveType) => {
          this.setState({ curveType });
        },
        setCurveScale: (curveScale) => {
          this.setState({ curveScale: round(curveScale, 2) });
        },
        setCurveOffsetX: (curveOffsetX) => {
          this.setState({ curveOffsetX: round(curveOffsetX, 2) });
        },
        setCurveOffsetY: (curveOffsetY) => {
          this.setState({ curveOffsetY: round(curveOffsetY, 2) });
        },
        setIsDramatic: (isDramatic) => {
          this.setState({ isDramatic });
        },
        setForceClose: (forceClose) => {
          this.setState({ forceClose });
        },
        setLineType: (lineType) => {
          if (lineType === 'linear') {
            this.setState({ forceClose: false });
          }
          this.setState({ lineType });
        },
        toggleThroughHoleExists: () => {
          const { state } = this;
          const bool = !state.throughHoleExists;
          this.setState({
            throughHoleExists: bool,
          });
        },
        setThroughHoleRadius: (r) => {
          const throughHoleRadius = round(r, 2);
          this.setState({ throughHoleRadius });
        },
        setThroughHoleX: (x) => {
          const throughHoleX = round(x, 2);
          this.setState({ throughHoleX });
        },
        setThroughHoleY: (y) => {
          const throughHoleY = round(y, 2);
          this.setState({ throughHoleY });
        },
        setPageWidth: (w) => {
          const pageWidth = round(w, 2);
          this.setState({ pageWidth });
        },
        setPageHeight: (h) => {
          const pageHeight = round(h, 2);
          this.setState({ pageHeight });
        },
      }}
      >
        {children}
      </SettingsContext.Provider>
    );
  }
}

export default SettingsProvider;
