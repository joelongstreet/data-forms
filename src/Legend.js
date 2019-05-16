import React from 'react';
import * as Styles from './Styles';

import SettingsContext from './Settings.context';


function Legend() {
  function setEffectType(context, effectType) {
    context.setEffectType(effectType);
  }

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
          <div
            role="button"
            tabIndex="0"
            onKeyPress={() => setEffectType(context, 'cut')}
            onClick={() => setEffectType(context, 'cut')}
          >
            <div style={Styles.getLegendLineStyle(2)} />
            Cut
          </div>
          <div
            role="button"
            tabIndex="0"
            onKeyPress={() => setEffectType(context, 'etch')}
            onClick={() => setEffectType(context, 'etch')}
          >
            <div style={Styles.getLegendLineStyle(3)} />
            Etch
          </div>
        </div>
      )}
    </SettingsContext.Consumer>
  );
}

export default Legend;
