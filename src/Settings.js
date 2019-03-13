import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DatumEntry from './DatumEntry';

function Settings(props) {

  const [tabPosition, setTabPosition] = useState(0);

  return (
    <div>
      <AppBar position="static">
        <Tabs value={tabPosition} onChange={(e, val) => setTabPosition(val)}>
          <Tab value={0} label="Data" />
          <Tab value={1} label="Settings" />
        </Tabs>
      </AppBar>

      { tabPosition === 0 && 
        <Typography>
          <DatumEntry datum={props.datum} onDatumChange={props.onDatumChange} />
        </Typography>
      }
      {
        tabPosition === 1 &&
        <Typography>
          Settings stuff
        </Typography>
      }
    </div>
  )
}

export default Settings;