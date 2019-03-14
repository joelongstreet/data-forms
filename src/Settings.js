import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DatumEntry from './DatumEntry';
import ShapeSelector from './ShapeSelector'

function Settings() {

  const [tabPosition, setTabPosition] = useState(1);

  return (
    <React.Fragment>
      <AppBar position="static">
        <Tabs value={tabPosition} onChange={(e, val) => setTabPosition(val)}>
          <Tab value={0} label="Data" />
          <Tab value={1} label="Settings" />
        </Tabs>
      </AppBar>

      { tabPosition === 0 && 
        <DatumEntry />
      }
      {
        tabPosition === 1 &&
        <ShapeSelector />
      }
    </React.Fragment>
  )
}

export default Settings;