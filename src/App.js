import React from 'react';
import {
  Col,
  Layout,
  Row,
} from 'antd';

import * as Styles from './Styles';
import Analytics from './Analytics';
import Examples from './Examples';
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

function App() {
  return (
    <SettingsProvider>
      <Legend />

      {/* Page Header */}
      <Row style={{ borderBottom: `1px solid ${Styles.colors[5]}` }}>
        <Col span={23} offset={1}>
          <h1 style={{
            height: Styles.headerHeight,
            fontFamily: "'Share Tech Mono', monospace",
            color: Styles.colors[8],
            padding: '10px 0 7px 0',
            margin: 0,
            letterSpacing: 20,
            fontSize: '40px',
            textShadow: '2px 2px 2px black',
          }}
          >
            DATA FORMS
          </h1>
        </Col>
      </Row>

      { /* Sidebar and preview */ }
      <Layout
        style={{
          width: '100%', height: '100%', position: 'absolute', top: 0, background: 'none', overflow: 'hidden',
        }}
      >
        <Content
          style={{
            marginTop: Styles.headerHeight,
            marginBottom: Styles.footerHeight,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
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
        <Sider
          width={450}
          style={{
            marginBottom: Styles.footerHeight,
            marginRight: 20,
            marginTop: 33,
            background: Styles.colors[0],
            border: `1px solid ${Styles.colors[5]}`,
            borderBottom: 'none',
            overflowY: 'scroll',
          }}
        >
          <Settings />
        </Sider>
      </Layout>

      <Examples />
      <Footer />
      <Analytics />
    </SettingsProvider>
  );
}

export default App;
