import React from 'react';
import {
  Col,
  Layout,
  Row,
} from 'antd';

import * as Styles from './Styles';
import Preview from './Preview';
import Settings from './Settings';
import SettingsProvider from './Settings.provider';
import Analytics from './Analytics';

const {
  Content,
  Sider,
} = Layout;

function App() {
  return (
    <SettingsProvider>
      <Row style={{
        backgroundColor: Styles.colors[0],
        borderBottom: `1px solid ${Styles.colors[5]}`,
      }}
      >
        <Col span={23} offset={1}>
          <h1 style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: Styles.colors[1],
            padding: '10px 0 7px 0',
            margin: 0,
            letterSpacing: 20,
            fontSize: '40px',
          }}
          >
            DATA FORMS
          </h1>
        </Col>
      </Row>

      <Layout style={{ backgroundColor: Styles.colors[0], height: '100%' }}>
        <Content>
          <Row>
            <Col
              span={24}
              style={{ marginTop: 50, overflowX: 'scroll' }}
            >
              <Preview />
            </Col>
          </Row>
        </Content>

        <Sider
          width={500}
          style={{
            background: Styles.colors[0],
            marginRight: 20,
            marginTop: -35,
            border: `1px solid ${Styles.colors[5]}`,
            borderBottom: 'none',
            paddingBottom: 50,
          }}
        >
          <Settings />
        </Sider>

      </Layout>
      <Analytics />
    </SettingsProvider>
  );
}

export default App;
