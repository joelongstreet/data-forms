import React, { Component } from 'react';

import SettingsContext from './Settings.context'
import { zipObject, round } from 'lodash';

const precision = 2;

class SettingsProvider extends Component {
  state = {
    units: 'in',
    datum: '1,2,3',
    shapeType: 'surround',
    shapeSideCount: 4,
    cellWidth: 4,
    cellHeight: 4,
    cellSizeMin: 1,
    cellSizeMax: 10,
    cellStepSize: 0.01,
    cellConstrainRatio: true,
  }

  getStateKeysWithUnits = () => {
    return [
      'cellWidth', 'cellHeight', 'cellSizeMin', 'cellSizeMax', 'cellStepSize'
    ]
  }

  render() {
    return (
      <SettingsContext.Provider value={{
        state: this.state,
        setUnits: (unit) => {
          if (this.state.units != unit) {
            const factor = unit === 'cm' ? 2.54 : 0.393701;

            const keys = this.getStateKeysWithUnits();
            const zipped = zipObject(
              keys,
              keys.map((key) => round(this.state[key]*factor, precision))
            );
            this.setState(zipped);
          }

          this.setState({ units: unit });
        },
        setDatum: (datum) => this.setState({
          datum: datum
        }),
        setShapeType: (type) => this.setState({
          shapeType: type
        }),
        setShapeSideCount: (count) => this.setState({
          shapeSideCount: count
        }),
        setCellWidth: (width) => {
          const s = round(width, 2);
          this.setState({ cellWidth: s });
          if (this.state.cellConstrainRatio) {
            this.setState({ cellHeight: s });
          }
        },
        setCellHeight: (height) => {
          const s = round(height, 2);
          this.setState({ cellHeight: s });
          if (this.state.cellConstrainRatio) {
            this.setState({ cellWidth: s });
          }
        },
        toggleCellConstrainRatio: () => {
          const bool = !this.state.cellConstrainRatio;
          this.setState({
            cellConstrainRatio: bool
          });
        }
      }}>
        {this.props.children}
      </SettingsContext.Provider>
    )
  }
}

export default SettingsProvider