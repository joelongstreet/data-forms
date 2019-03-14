import React, { Component } from 'react';

import SettingsContext from './Settings.context'

class SettingsProvider extends Component {
  state = {
    datum: '1,2,3',
    shapeType: 'surround',
    shapeSideCount: 4,
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
        })
      }}>
        {this.props.children}
      </SettingsContext.Provider>
    )
  }
}

export default SettingsProvider