import React, { useState } from 'react';
import Settings from './Settings'

import { Grid } from '@material-ui/core';

function App() {
  const [shapeType, setShapeType] = useState('polygon');
  const [shapeSideCount, setShapeSideCount] = useState(4);
  const [datum, setDatum] = useState('1,2');

  return (    
    <div className="App">
      <Grid container spacing={24}>
        <Grid item xs={8}>
          { datum }
        </Grid>
        <Grid item xs={4}>
          <Settings
            datum={datum}
            onDatumChange={setDatum}
            shapeType={shapeType}
            onShapeTypeChange={setShapeType}
            shapeSideCount={shapeSideCount}
            onShapeSideCountChange={setShapeSideCount}
          />
        </Grid>
      </Grid>
      <p>{shapeSideCount}</p>
      <p>{shapeType}</p>
    </div>
  );
}

export default App;
