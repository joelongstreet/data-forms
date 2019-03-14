import React from 'react';

import SettingsContext from './Settings.context'

function DatumEntry(){
  return (
    <SettingsContext.Consumer>
      {(context) => (
        <textarea
          value={context.state.datum}
          onChange={(e) => context.setDatum(e.target.value)}>
        </textarea>
      )}
    </SettingsContext.Consumer>
  )
}

export default DatumEntry;