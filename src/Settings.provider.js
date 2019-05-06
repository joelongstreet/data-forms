import React, { Component } from 'react';
import { zipObject, round } from 'lodash';
import SettingsContext from './Settings.context';

import { inchesPerCentimenter, centimetersPerInch } from './util';

const unitConversionPrecision = 2;


class SettingsProvider extends Component {
  state = {
    cellSize: 4,
    cellSizeMin: 0.1,
    cellSizeMax: 10,
    curveOffsetX: 0,
    curveOffsetY: 0.2,
    curveRotation: 0,
    curveScaleX: 0.5,
    curveScaleY: 0.5,
    curveType: 'curveBasisClosed',
    datum: '',
    defaultSliderStepSize: 0.01,
    effectType: 'etch',
    etchWidth: 0.01,
    etchWidthMin: 0.001,
    etchWidthMax: 0.2,
    isDramatic: true,
    isSingleton: false,
    lineType: 'radial',
    pageWidth: 16,
    pageWidthMax: 48,
    pageHeight: 12,
    pageHeightMax: 96,
    shapeSideCount: 4,
    showSurround: true,
    textAreaHighlightIndex: 0,
    throughHoleExists: true,
    throughHoleRadius: 0.12,
    throughHoleX: 2,
    throughHoleY: 0.5,
    units: 'in',
  }

  getStateKeysWithUnits = () => [
    'defaultSliderStepSize',
    'cellSize', 'cellSizeMin', 'cellSizeMax',
    'curveOffsetX', 'curveOffsetY',
    'etchWidth', 'etchWidthMax',
    'throughHoleRadius', 'throughHoleX', 'throughHoleY',
    'pageWidth', 'pageWidthMax', 'pageHeight', 'pageHeightMax',
  ]

  render() {
    const { children } = this.props;

    return (
      <SettingsContext.Provider value={{
        state: this.state,
        setCellSize: cellSize => this.setState({ cellSize }),
        setCurveType: curveType => this.setState({ curveType }),
        setCurveOffsetX: curveOffsetX => this.setState({ curveOffsetX }),
        setCurveOffsetY: curveOffsetY => this.setState({ curveOffsetY }),
        setCurveRotation: curveRotation => this.setState({ curveRotation }),
        setCurveScaleX: curveScaleX => this.setState({ curveScaleX }),
        setCurveScaleY: curveScaleY => this.setState({ curveScaleY }),
        setDatum: datum => this.setState({ datum }),
        setEffectType: effectType => this.setState({ effectType }),
        setEtchWidth: etchWidth => this.setState({ etchWidth }),
        setForceClose: forceClose => this.setState({ forceClose }),
        setIsDramatic: isDramatic => this.setState({ isDramatic }),
        setIsSingleton: (isSingleton) => {
          if (!isSingleton) {
            this.setState({
              throughHoleExists: false,
              showSurround: false,
            });
          }

          this.setState({ isSingleton });
        },
        setLineType: (lineType) => {
          if (lineType === 'linear') {
            this.setState({ forceClose: false });
          }
          this.setState({ lineType });
        },
        setPageWidth: pageWidth => this.setState({ pageWidth }),
        setPageHeight: pageHeight => this.setState({ pageHeight }),
        setShapeSideCount: shapeSideCount => this.setState({ shapeSideCount }),
        setTextAreaHighlightIndex: textAreaHighlightIndex => this.setState({
          textAreaHighlightIndex,
        }),
        setThroughHoleExists: throughHoleExists => this.setState({ throughHoleExists }),
        setThroughHoleRadius: throughHoleRadius => this.setState({ throughHoleRadius }),
        setThroughHoleX: throughHoleX => this.setState({ throughHoleX }),
        setThroughHoleY: throughHoleY => this.setState({ throughHoleY }),
        setUnits: (unit) => {
          const { state } = this;
          if (state.units !== unit) {
            const factor = unit === 'cm' ? centimetersPerInch : inchesPerCentimenter;

            const keys = this.getStateKeysWithUnits();
            const zipped = zipObject(
              keys,
              keys.map(key => round(state[key] * factor, unitConversionPrecision)),
            );
            this.setState(zipped);
          }
          this.setState({ units: unit });
        },
        setShowSurround: (showSurround) => {
          if (!showSurround) {
            this.setState({
              throughHoleExists: false,
            });
          }
          this.setState({ showSurround });
        },
      }}
      >
        {children}
      </SettingsContext.Provider>
    );
  }
}

export default SettingsProvider;
