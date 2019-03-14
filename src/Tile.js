import React from 'react';

import SettingsContext from './Settings.context'

function Tile() {

  return (
    <SettingsContext.Consumer>
      {(context) => (
        <React.Fragment>
          <p>Datum: {context.state.datum}</p>
          <p>Shape Type: {context.state.shapeType}</p>
          <p>Shape Side Count: {context.state.shapeSideCount}</p>
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default Tile;