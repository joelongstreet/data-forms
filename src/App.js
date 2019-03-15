import React from 'react';
import { Layout } from 'antd';

import Tile from './Tile';
import Settings from './Settings';
import SettingsProvider from './Settings.provider';

const {
  Content,
  Header,
  Sider
} = Layout;

function App() {
  return (
    <SettingsProvider>
      <Layout>
        <Layout>
          <Header className="header">
            <h1 style={{'color': 'white'}}>Data Forms</h1>
          </Header>
          <Content>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Tile />
            </div>
            
          </Content>
        </Layout>

        <Sider width={500} style={{ background: '#fff' }} minHeight={500}>
          <Settings />
        </Sider>

      </Layout>
    </SettingsProvider>
  );
}

export default App;
