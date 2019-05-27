import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Icon, Layout, Row } from 'antd';

import * as Styles from './Styles';
import Analytics from './Analytics';
import Examples from './Examples';
import Legend from './Legend';
import Menu from './Menu';
import PagePreview from './PagePreview';
import Preview from './Preview';
import Settings from './Settings';
import SettingsProvider from './Settings.provider';
import SettingsContext from './Settings.context';

const { Content } = Layout;
const env = process.env.NODE_ENV;
const isProduction = env === 'production';

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
    flexDirection: 'row',
  },
  content: {
    marginTop: Styles.breaks.default.headerHeight,
    marginBottom: Styles.breaks.default.footerHeight,
    position: 'relative',
    overflow: 'hidden',
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      marginTop: Styles.breaks.medium.headerHeight,
      marginBottom: Styles.breaks.medium.footerHeight,
    },
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      marginTop: Styles.breaks.small.headerHeight,
      marginBottom: Styles.breaks.small.footerHeight,
    },
  },
  aside: {
    position: 'relative',
    marginBottom: Styles.breaks.default.footerHeight,
    marginRight: 20,
    marginTop: 33,
    background: Styles.colors[0],
    border: `1px solid ${Styles.colors[5]}`,
    borderBottom: 'none',
    overflowY: 'scroll',
    zIndex: 3,
    flex: '0 0 450px',
    maxWidth: 450,
    minWidth: 450,
    width: 450,
    transform: 'translateX(0%)',
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      transform: 'translateX(100%)',
      paddingTop: 7,
      transition: 'transform 0.5s',
      position: 'absolute',
      borderTop: 'none',
      height: '101%',
      marginTop: 0,
      minWidth: '50%',
      width: '50%',
      flex: 'auto',
      maxWidth: '50%',
    },
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      border: `1px solid ${Styles.colors[5]}`,
      borderTop: 'none',
      minWidth: '100%',
      width: '100%',
      maxWidth: '100%',
    },
  },
  asideStateOpen: {
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      transform: 'translateX(100%)',
    },
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      transform: 'translateX(0%)',
    },
  },
  asideStateClosed: {
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      transform: 'translateX(200%)',
    },
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      transform: 'translateX(100%)',
    },
  },
  menu: {
    background: Styles.colors[0],
    height: Styles.breaks.default.footerHeight,
    borderTop: `1px solid ${Styles.colors[5]}`,
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    width: '100%',
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      border: `1px solid ${Styles.colors[5]}`,
      borderTop: 'none',
      transition: 'transform 0.5s',
      width: '100%',
      height: '101%',
      top: 0,
    },
  },
  menuStateOpen: {
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      transform: 'translateX(0%)',
    },
  },
  menuStateClosed: {
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      transform: 'translateX(-100%)',
    },
  },
  settingsIcon: {
    zIndex: 2,
    position: 'absolute',
    padding: 15,
    top: 0,
    right: 0,
    fontSize: 16,
    cursor: 'pointer',
    display: 'none',
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      display: 'block',
    },
  },
  menuIcon: {
    zIndex: 2,
    position: 'absolute',
    padding: 15,
    top: 0,
    left: 0,
    fontSize: 16,
    cursor: 'pointer',
    display: 'none',
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      display: 'block',
    },
  },
  closeIcon: {
    zIndex: 2,
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 20,
    fontSize: 20,
    cursor: 'pointer',
    display: 'none',
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      display: 'block',
    },
  },
  closeMenu: {
    left: 'auto',
    right: 0,
    [`@media (max-width: ${Styles.breaks.medium.width}px)`]: {
      display: 'none',
    },
    [`@media (max-width: ${Styles.breaks.small.width}px)`]: {
      display: 'block',
    },
  },
});

class App extends Component {
  state = {
    settingsOpen: false,
    examplesVisible: isProduction,
    menuOpen: false,
  }

  openExamples = () => {
    this.setState({ examplesVisible: true });
  }

  closeExamples = () => {
    this.closeMenu();
    this.setState({ examplesVisible: false });
  }

  toggleSettings() {
    const { settingsOpen } = this.state;
    this.setState({ settingsOpen: !settingsOpen });
  }

  openMenu() {
    this.setState({ menuOpen: true });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    const { settingsOpen, menuOpen, examplesVisible } = this.state;
    const asideStateClass = settingsOpen ? ruleSets.asideStateOpen : ruleSets.asideStateClosed;
    const menuStateClass = menuOpen ? ruleSets.menuStateOpen : ruleSets.menuStateClosed;

    return (
      <SettingsProvider>
        <Legend />

        {/* Page Header */}
        <Row style={{ borderBottom: `1px solid ${Styles.colors[5]}` }}>
          <Icon type="menu" className={css(ruleSets.menuIcon)} onClick={() => { this.openMenu(); }} />
          <h1 className={css(ruleSets.heading)}>Data Forms</h1>
          <Icon theme="filled" type="setting" className={css(ruleSets.settingsIcon)} onClick={() => { this.toggleSettings(); }} />
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
          <aside className={css(ruleSets.aside, asideStateClass)}>
            <Icon type="close" className={css(ruleSets.closeIcon)} style={{ top: '-5px' }} onClick={() => { this.toggleSettings(); }} />
            <Settings />
          </aside>
        </Layout>

        <div className={css(ruleSets.menu, menuStateClass)}>
          <Icon type="close" className={css(ruleSets.closeIcon, ruleSets.closeMenu)} onClick={() => { this.closeMenu(); }} />
          <Menu openExamples={this.openExamples} />
        </div>
        
        {/* Examples page */}
        <Examples
          onClose={this.closeExamples}
          visible={examplesVisible}
        />
        <Analytics />
      </SettingsProvider>
    );
  }
}

export default App;
