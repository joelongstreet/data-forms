import React from 'react';
import { Input } from 'antd';

import SettingsContext from './Settings.context';

const { TextArea } = Input;

function SettingsDatum(){
  return (
    <SettingsContext.Consumer>
      {(context) => (
        <TextArea
          rows={10}
          value={context.state.datum}
          onChange={(e) => context.setDatum(e.target.value)}
        />
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsDatum;