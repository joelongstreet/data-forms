import React from 'react';
import {
  Col,
  Layout,
  Row
} from 'antd';

import * as Styles from './Styles';
import SvgPreview from './SvgPreview';
import Settings from './Settings';
import SettingsProvider from './Settings.provider';

const {
  Content,
  Sider
} = Layout;

function App() {
  return (
    <SettingsProvider>
      <Row style={{ backgroundColor: '#1890ff' }}>
        <Col span={23} offset={1}>
          <h1 style={{
            fontFamily: "'Bungee Shade', cursive",
            color: 'white',
            padding: 10,
            margin: 0,
            letterSpacing: '15px',
            fontSize: '32px'
          }}>DATA FORMS</h1>
        </Col>
      </Row>

      <Layout style={{background: 'none'}}>
        <Content>
          <Row>
            <Col
              span={20}
              offset={2}
              style={{marginTop: 20}}>
              <SvgPreview />
            </Col>
          </Row>
        </Content>

        <Sider
          width={500}
          style={{
            background: Styles.colors[0],
            marginRight: 20,
            marginTop: -35,
            border: `1px solid ${Styles.colors[2]}`,
            borderBottom: 'none',
            paddingBottom: 50
          }}>
          <Settings />
        </Sider>

      </Layout>
    </SettingsProvider>
  );
}

export default App;
