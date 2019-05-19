import React, { Component } from 'react';
import { zipObject, round } from 'lodash';
import SettingsContext from './Settings.context';
import ExampleData from './Examples.data';

import { inchesPerCentimenter, centimetersPerInch } from './util';

const unitConversionPrecision = 2;

class SettingsProvider extends Component {
  state = {
    activeExampleIndex: 0,
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
        setActiveExampleIndex: (activeExampleIndex) => {
          this.setState({ activeExampleIndex });

          const { settings } = ExampleData[activeExampleIndex];
          this.setState(settings);
        },
        setCellSize: (cellSize) => {
          const { state } = this;

          if (state.throughHoleExists) {
            const xRatio = state.throughHoleX / state.cellSize;
            const yRatio = state.throughHoleY / state.cellSize;

            this.setState({
              throughHoleX: xRatio * cellSize,
              throughHoleY: yRatio * cellSize,
            });
          }

          this.setState({ cellSize });
        },
        setCurveType: (curveType) => {
          const { lineType } = this.state;
          if (lineType === 'radial' && curveType.includes('Closed')) {
            this.setState({ forceClose: false });
          }
          this.setState({ curveType });
        },
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
          if (isSingleton) {
            this.setState({
              throughHoleExists: false,
              showSurround: false,
            });
          }

          this.setState({ isSingleton });
        },
        setLineType: (lineType, suggestCurveType) => {
          const { curveType } = this.state;

          let newCurveType;
          if (lineType === 'linear' && suggestCurveType) {
            if (curveType === 'curveBasisClosed') newCurveType = 'curveBasis';
            if (curveType === 'curveCardinalClosed') newCurveType = 'curveCardinal';
            if (curveType === 'curveCatmullRomClosed') newCurveType = 'curveCatmullRom';
            if (curveType === 'curveLinearClosed') newCurveType = 'curveLinear';
            this.setState({ forceClose: false });
          }
          if (lineType === 'radial' && suggestCurveType) {
            if (curveType === 'curveBasis') newCurveType = 'curveBasisClosed';
            else if (curveType === 'curveCardinal') newCurveType = 'curveCardinalClosed';
            else if (curveType === 'curveCatmullRom') newCurveType = 'curveCatmullRomClosed';
            else if (curveType === 'curveLinear') newCurveType = 'curveLinearClosed';
            else this.setState({ forceClose: true });
          }
          if (newCurveType) this.setState({ curveType: newCurveType });

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
