import React from 'react';

import TileGroup from './TileGroup';
import SettingsContext from './Settings.context';

function Preview() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <TileGroup
          cellWidth={context.state.cellWidth}
          cellHeight={context.state.cellHeight}
          datum={context.state.datum}
          shapeSideCount={context.state.shapeSideCount}
          shapeType={context.state.shapeType}
          throughHoleExists={context.state.throughHoleExists}
          throughHoleRadius={context.state.throughHoleRadius}
          throughHoleX={context.state.throughHoleX}
          throughHoleY={context.state.throughHoleY}
          units={context.state.units}
        />
      )}
    </SettingsContext.Consumer>
  );
}

export default Preview;
