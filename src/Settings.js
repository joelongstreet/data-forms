import React, { useState } from 'react';
import {
  AppBar,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
} from '@material-ui/core';
import {
  Lock as IconLock,
  LockOpen as IconLockOpen
} from '@material-ui/icons';

import DatumEntry from './DatumEntry';
import ShapeSelector from './ShapeSelector';
import SettingsContext from './Settings.context';
import UnitSlider from './UnitSlider';


function Settings() {

  const [tabPosition, setTabPosition] = useState(0);

  return (
    <SettingsContext.Consumer>
      {(context) => (
        <React.Fragment>
          <AppBar position="static">
            <Tabs value={tabPosition} onChange={(e, val) => setTabPosition(val)}>
              <Tab value={0} label="Form" />
              <Tab value={1} label="Data" />
              <Tab value={2} label="Page" />
            </Tabs>
          </AppBar>

          { tabPosition === 0 && 
            <React.Fragment>
              <ShapeSelector />

              <hr />
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
                />
              }
              <hr />

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
          }
          {
            tabPosition === 1 &&
            <DatumEntry />
          }
          {
            tabPosition === 2 &&
            <React.Fragment>
              <FormControl component="fieldset">
                <FormLabel component="legend">Units</FormLabel>
                <RadioGroup
                  aria-label="units"
                  name="units"
                  value={context.state.units}
                  onChange={(e) => context.setUnits(e.target.value)}>
                  <FormControlLabel value="in" control={<Radio />} label="in" />
                  <FormControlLabel value="cm" control={<Radio />} label="cm" />
                </RadioGroup>
              </FormControl>
              <UnitSlider
                label="w"
                onChange={context.setPageWidth}
                value={context.state.pageWidth}
                min={0}
                max={context.state.pageWidthMax}
              />
              <UnitSlider
                label="h"
                onChange={context.setPageHeight}
                value={context.state.pageHeight}
                min={0}
                max={context.state.pageHeightMax}
              />
            </React.Fragment>
          }
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default Settings;