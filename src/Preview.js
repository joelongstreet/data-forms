import React from 'react';

import TileGroup from './TileGroup';
import SettingsContext from './Settings.context';

function Preview() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <TileGroup
          curveOffsetX={context.state.curveOffsetX}
          curveOffsetY={context.state.curveOffsetY}
          curveRotation={context.state.curveRotation}
          curveScaleX={context.state.curveScaleX}
          curveScaleY={context.state.curveScaleY}
          curveType={context.state.curveType}
          cellSize={context.state.cellSize}
          datum={context.state.datum}
          effectType={context.state.effectType}
          etchWidth={context.state.etchWidth}
          lineType={context.state.lineType}
          forceClose={context.state.forceClose}
          isDramatic={context.state.isDramatic}
          shapeSideCount={context.state.shapeSideCount}
          showSurround={context.state.showSurround}
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
