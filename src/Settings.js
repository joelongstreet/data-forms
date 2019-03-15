import React from 'react';
import { Tabs } from 'antd';

import SettingsShape from './Settings-shape';
import SettingsDatum from './Settings-datum';
import SettingsPage from './Settings-page';

const { TabPane } = Tabs;

function Settings() {

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Form" key="1">
        <SettingsShape />
      </TabPane>
      <TabPane tab="Data" key="2">
        <SettingsDatum />
      </TabPane>
      <TabPane tab="Page" key="3">
        <SettingsPage />
      </TabPane>
    </Tabs>
  );
}

export default Settings;