/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import * as Styles from './Styles';

import SettingsContext from './Settings.context';


function Legend() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <div
          style={{
            cursor: 'pointer',
            padding: 10,
            paddingRight: 20,
            left: 0,
            border: `1px solid ${Styles.colors[5]}`,
            borderLeft: 'none',
            position: 'absolute',
            zIndex: 2,
            top: Styles.headerHeight + 30,
          }}
        >
          <div onClick={() => context.setEffectType('cut')}>
            <div style={Styles.getLegendLineStyle(2)} />
            Cut
          </div>
          <div onClick={() => context.setEffectType('etch')}>
            <div style={Styles.getLegendLineStyle(3)} />
            Etch
          </div>
        </div>
      )}
    </SettingsContext.Consumer>
  );
}

export default Legend;
