import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import * as Styles from './Styles';

import SettingsContext from './Settings.context';

const ruleSets = StyleSheet.create({
  legend: {
    backgroundColor: Styles.colors[0],
    cursor: 'pointer',
    padding: 10,
    paddingRight: 20,
    left: 0,
    border: `1px solid ${Styles.colors[5]}`,
    borderLeft: 'none',
    position: 'absolute',
    zIndex: 2,
    top: Styles.breaks.default.headerHeight + 30,
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      top: Styles.breaks.medium.headerHeight + 30,
    },
  },
  line: {
    borderTop: '1px solid',
    width: 10,
    float: 'left',
    marginTop: 10,
    marginRight: 10,
  },
});


function Legend() {
  function setEffectType(context, effectType) {
    context.setEffectType(effectType);
  }

  return (
    <SettingsContext.Consumer>
      {context => (
        <div className={css(ruleSets.legend)}>
          <div
            role="button"
            tabIndex="0"
            onKeyPress={() => setEffectType(context, 'cut')}
            onClick={() => setEffectType(context, 'cut')}
          >
            <div className={css(ruleSets.line)} style={{ borderColor: Styles.colors[2] }} />
            Cut
          </div>
          <div
            role="button"
            tabIndex="0"
            onKeyPress={() => setEffectType(context, 'etch')}
            onClick={() => setEffectType(context, 'etch')}
          >
            <div className={css(ruleSets.line)} style={{ borderColor: Styles.colors[3] }} />
            Etch
          </div>
        </div>
      )}
    </SettingsContext.Consumer>
  );
}

export default Legend;
