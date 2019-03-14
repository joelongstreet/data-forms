import React, { Component } from 'react';

import SettingsContext from './Settings.context'

class SettingsProvider extends Component {
  state = {
    units: 'in',
    datum: '1,2,3',
    shapeType: 'surround',
    shapeSideCount: 4,
    cellWidth: 3,
    cellHeight: 3,
    cellSizeMin: 3,
    cellSizeMax: 10,
    cellStepSize: 0.5,
    cellConstrainRatio: true,
  }
  render() {
    return (
      <SettingsContext.Provider value={{
        state: this.state,
        setUnits: (unit) => this.setState({
          units: unit
        }),
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
          this.setState({ cellWidth: width });
          if (this.state.cellConstrainRatio) {
            this.setState({ cellHeight: width });
          }
        },
        setCellHeight: (height) => {
          this.setState({ cellHeight: height });
          if (this.state.cellConstrainRatio) {
            this.setState({ cellWidth: height });
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