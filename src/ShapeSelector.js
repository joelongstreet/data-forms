import React from 'react';

import GraphIcon from '@material-ui/icons/Timeline';
import ShapeIcon from '@material-ui/icons/Lens';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Slider from '@material-ui/lab/Slider';

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