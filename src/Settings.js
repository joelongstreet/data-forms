import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DatumEntry from './DatumEntry';
import ShapeSelector from './ShapeSelector'

function Settings(props) {

  const [tabPosition, setTabPosition] = useState(1);

  return (
    <div>
      <AppBar position="static">
        <Tabs value={tabPosition} onChange={(e, val) => setTabPosition(val)}>
          <Tab value={0} label="Data" />
          <Tab value={1} label="Settings" />
        </Tabs>
      </AppBar>

      { tabPosition === 0 && 
        <DatumEntry datum={props.datum} onDatumChange={props.onDatumChange} />
      }
      {
        tabPosition === 1 &&
        <ShapeSelector
          shapeType={props.shapeType}
          onShapeTypeChange={props.onShapeTypeChange}
          shapeSideCount={props.shapeSideCount}
          onShapeSideCountChange={props.onShapeSideCountChange} />
      }
    </div>
  )
}

export default Settings;