import React from 'react';
import {
  Tabs,
  Row,
  Col,
} from 'antd';

import SettingsShape from './Settings-shape';
import SettingsDatum from './Settings-datum';
import SettingsPage from './Settings-page';

const { TabPane } = Tabs;

function Settings() {
  return (
    <Tabs defaultActiveKey="2" tabBarStyle={{ textAlign: 'center' }}>
      <TabPane tab="Shape" key="1">
        <Row>
          <Col span={20} offset={2}>
            <SettingsShape />
          </Col>
        </Row>
      </TabPane>
      <TabPane tab="Data" key="2">
        <Row>
          <Col span={20} offset={2}>
            <SettingsDatum />
          </Col>
        </Row>
      </TabPane>
      <TabPane tab="Page" key="3">
        <Row>
          <Col span={20} offset={2}>
            <SettingsPage />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
}

export default Settings;
