import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DatumEntry from './DatumEntry';
import ShapeSelector from './ShapeSelector'
import SettingsContext from './Settings.context'
import UnitSlider from './UnitSlider'

function Settings() {

  const [tabPosition, setTabPosition] = useState(1);

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
            <ShapeSelector />
          }
          {
            tabPosition === 1 &&
            <DatumEntry />
          }
          {
            tabPosition === 2 &&
            <UnitSlider
              label="Width"
              onChange={context.setCellWidth}
              value={context.state.cellWidth}
              min={context.state.cellSizeMin}
              max={context.state.cellSizeMax}
              step={context.state.cellStepSize}
            />
          }
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  )
}

export default Settings;