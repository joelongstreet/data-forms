import React from 'react';
import {
  Timeline as GraphIcon,
  Lens as ShapeIcon
} from '@material-ui/icons';
import {
  ToggleButton,
  ToggleButtonGroup,
  Slider
} from '@material-ui/lab';

import SettingsContext from './Settings.context';

function ShapeSelector() {
  return (
    <SettingsContext.Consumer>
      {(context) => (
        <React.Fragment>
          <ToggleButtonGroup
            value={context.state.shapeType}
            exclusive
            onChange={(e, val) => context.setShapeType(val)}
          >
            <ToggleButton value="surround">
              <ShapeIcon />
            </ToggleButton>
            <ToggleButton value="isolate">
              <GraphIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <br />
          { context.state.shapeType === 'surround' && 
            <Slider
              value={context.state.shapeSideCount}
              min={1}
              max={8}
              step={1}
              onChange={(e, val) => context.setShapeSideCount(val)}
            />
          }
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default ShapeSelector;