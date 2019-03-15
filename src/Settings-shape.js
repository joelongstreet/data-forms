import React from 'react';
import {
  Divider,
  Radio
} from 'antd';
import {
  Lock as IconLock,
  LockOpen as IconLockOpen
} from '@material-ui/icons';
import {
  IconButton,
} from '@material-ui/core';

import UnitSlider from './UnitSlider';
import SettingsContext from './Settings.context';

function SettingsShape(){
  return (
    <SettingsContext.Consumer>
      {(context) => (
        <React.Fragment>
          <Divider>Shape</Divider>
          <Radio.Group
            value={context.state.shapeType}
            buttonStyle="solid"
            onChange={(e) => context.setShapeType(e.target.value)}
          >
            <Radio.Button value="surround" icon="download">Surround</Radio.Button>
            <Radio.Button value="isolate" icon="download">Isolate</Radio.Button>
          </Radio.Group>

          <Divider>Cell</Divider>
          <IconButton onClick={context.toggleCellConstrainRatio}>
            { context.state.cellConstrainRatio ? (
              <IconLock></IconLock>
            ) : (
              <IconLockOpen></IconLockOpen>
            )}
          </IconButton>
          <UnitSlider
            label="Width"
            onChange={context.setCellWidth}
            value={context.state.cellWidth}
            min={context.state.cellSizeMin}
            max={context.state.cellSizeMax}
          />
          <UnitSlider
            label="Height"
            onChange={context.setCellHeight}
            value={context.state.cellHeight}
            min={context.state.cellSizeMin}
            max={context.state.cellSizeMax}
          />

          { context.state.shapeType === 'surround' && 
            <UnitSlider
              label="Sides"
              onChange={context.setShapeSideCount}
              value={context.state.shapeSideCount}
              min={1}
              max={8}
              step={1}
              hideUnits
            />
          }

          <Divider>Through</Divider>

          <input type='checkbox'
            checked={context.state.throughHoleExists}
            onChange={context.toggleThroughHoleExists}
          />

          <UnitSlider
            label="x"
            onChange={context.setThroughHoleX}
            value={context.state.throughHoleX}
            min={0}
            max={context.state.cellWidth}
          />
          <UnitSlider
            label="y"
            onChange={context.setThroughHoleY}
            value={context.state.throughHoleY}
            min={0}
            max={context.state.cellHeight}
          />
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsShape;