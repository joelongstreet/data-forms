import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Layout, Row } from 'antd';

import * as Styles from './Styles';
import Analytics from './Analytics';
import Footer from './Footer';
import Legend from './Legend';
import PagePreview from './PagePreview';
import Preview from './Preview';
import Settings from './Settings';
import SettingsProvider from './Settings.provider';
import SettingsContext from './Settings.context';

const {
  Content,
  Sider,
} = Layout;

const ruleSets = StyleSheet.create({
  heading: {
    height: Styles.breaks.default.headerHeight,
    fontFamily: Styles.displayFont,
    color: Styles.colors[8],
    paddingTop: 10,
    margin: '0 100px 0',
    textShadow: `2px 2px 2px ${Styles.colors[10]}`,
    letterSpacing: 20,
    fontSize: 40,
    textTransform: 'uppercase',
    [`@media (max-width: ${Styles.breaks.large.width}px)`]: {
      marginLeft: 30,
      paddingTop: 20,
      fontSize: 25,
      letterSpacing: 15,
    },
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      marginLeft: 0,
      marginRight: 0,
      height: 50,
      letterSpacing: 12,
      paddingTop: 10,
      fontSize: 20,
      textAlign: 'center',
    },
  },
  layout: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    background: 'none',
    overflow: 'hidden',
  },
  content: {
    marginTop: Styles.breaks.default.headerHeight,
    marginBottom: Styles.breaks.default.footerHeight,
    position: 'relative',
    overflow: 'hidden',
  },
  sider: {
    marginBottom: Styles.breaks.default.footerHeight,
    marginRight: 20,
    marginTop: 33,
    background: Styles.colors[0],
    border: `1px solid ${Styles.colors[5]}`,
    borderBottom: 'none',
    overflowY: 'scroll',
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      transform: 'translateX(140%)',
      position: 'absolute',
      borderTop: 'none',
      height: '100%',
      marginTop: 0,
    },
  },
});

function App() {
  return (
    <SettingsProvider>
      <Legend />

      {/* Page Header */}
      <Row style={{ borderBottom: `1px solid ${Styles.colors[5]}` }}>
        <h1 className={css(ruleSets.heading)}>Data Forms</h1>
      </Row>

      { /* Sidebar and preview */ }
      <Layout className={css(ruleSets.layout)}>
        <Content className={css(ruleSets.content)}>
          <SettingsContext.Consumer>
            {context => (
              <React.Fragment>
                <PagePreview
                  cellSize={context.state.cellSize}
                  datum={context.state.datum}
                  isSingleton={context.state.isSingleton}
                  pageHeight={context.state.pageHeight}
                  pageWidth={context.state.pageWidth}
                  units={context.state.units}
                />
                <Preview
                  cellSize={context.state.cellSize}
                  textAreaHighlightIndex={context.state.textAreaHighlightIndex}
                  units={context.state.units}
                />
              </React.Fragment>
            )}
          </SettingsContext.Consumer>
        </Content>
        <Sider width={450} className={css(ruleSets.sider)}>
          <Settings />
        </Sider>
      </Layout>

      <Footer />
      <Analytics />
    </SettingsProvider>
  );
}

export default App;
