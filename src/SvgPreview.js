import React from 'react';

import Tile from './Tile';
import SettingsContext from './Settings.context';

function SvgPreview() {
  return (
    <SettingsContext.Consumer>
      {(context) => (
        context.state.datum.split('\n').map((data, i) => {
          return <Tile
            key={i}
            data={data}
          />;
        })
      )}
    </SettingsContext.Consumer>
  );
}

export default SvgPreview;