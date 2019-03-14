import React, { Component } from 'react';

import SettingsContext from './Settings.context'

class SettingsProvider extends Component {
  state = {
    datum: '1,2,3',
    shapeType: 'surround',
    shapeSideCount: 4,
    cellWidth: 3,
    cellSizeMin: 3,
    cellSizeMax: 30,
    cellStepSize: 0.5,
  }
  render() {
    return (
      <SettingsContext.Provider value={{
        state: this.state,
        setDatum: (datum) => this.setState({
          datum: datum
        }),
        setShapeType: (type) => this.setState({
          shapeType: type
        }),
        setShapeSideCount: (count) => this.setState({
          shapeSideCount: count
        }),
        setCellWidth: (width) => this.setState({
          cellWidth: width
        })
      }}>
        {this.props.children}
      </SettingsContext.Provider>
    )
  }
}

export default SettingsProvider