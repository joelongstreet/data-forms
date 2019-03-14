import React from 'react';
import { Grid } from '@material-ui/core';

import Tile from './Tile'
import Settings from './Settings'
import SettingsProvider from './Settings.provider';

function App() {
  return (    
    <SettingsProvider>
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Tile />
          </Grid>
          <Grid item xs={4}>
            <Settings />
          </Grid>
        </Grid>
      </React.Fragment>
    </SettingsProvider>
  );
}

export default App;
