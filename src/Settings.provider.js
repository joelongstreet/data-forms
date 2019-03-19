import React, { Component } from 'react';
import { zipObject, round } from 'lodash';

import { inchesPerCentimenter, centimetersPerInch } from './util';
import SettingsContext from './Settings.context';

const precision = 2;

class SettingsProvider extends Component {
  state = {
    cellWidth: 4,
    cellHeight: 4,
    cellSizeMin: 1,
    cellSizeMax: 10,
    cellConstrainRatio: true,
    datum: '1,2,3 \n4,5,6 ',
    defaultSliderStepSize: 0.01,
    effectType: 'etch',
    pageWidth: 24,
    pageWidthMax: 48,
    pageHeight: 12,
    pageHeightMax: 96,
    shapeType: 'surround',
    shapeSideCount: 4,
    throughHoleExists: true,
    throughHoleRadius: 0.25,
    throughHoleX: 3.5,
    throughHoleY: 0.5,
    units: 'in',
  }

  getStateKeysWithUnits = () => {
    return [
      'defaultSliderStepSize',
      'cellWidth', 'cellHeight', 'cellSizeMin', 'cellSizeMax',
      'throughHoleRadius', 'throughHoleX', 'throughHoleY',
      'pageWidth', 'pageWidthMax', 'pageHeight', 'pageHeightMax',
    ];
  }

  render() {
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
              keys.map((key) => round(state[key]*factor, precision))
            );
            this.setState(zipped);
          }

          this.setState({ units: unit });
        },
        setDatum: (datum) => this.setState({ datum }),
        setShapeType: (shapeType) => {
          this.setState({ shapeType });
          if (shapeType === 'isolate') {
            this.setState({ effectType: 'cut' });
          }
        },
        setEffectType: (effectType) => this.setState({ effectType }),
        setShapeSideCount: (shapeSideCount) => this.setState({
          shapeSideCount
        }),
        setCellWidth: (width) => {
          const { state } = this;
          const s = round(width, 2);
          this.setState({ cellWidth: s });
          if (state.cellConstrainRatio) {
            this.setState({ cellHeight: s });
          }
        },
        setCellHeight: (height) => {
          const { state } = this;
          const s = round(height, 2);
          this.setState({ cellHeight: s });
          if (state.cellConstrainRatio) {
            this.setState({ cellWidth: s });
          }
        },
        toggleCellConstrainRatio: () => {
          const { state } = this;
          const bool = !state.cellConstrainRatio;
          this.setState({
            cellConstrainRatio: bool
          });
        },
        toggleThroughHoleExists: () => {
          const { state } = this;
          const bool = !state.throughHoleExists;
          this.setState({
            throughHoleExists: bool
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
        }
      }}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}

export default SettingsProvider;