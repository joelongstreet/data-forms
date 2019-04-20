import React from 'react';
import {
  Checkbox,
  Col,
  Divider,
  Row,
} from 'antd';

import UnitSlider from './UnitSlider';
import SettingsContext from './Settings.context';


function SettingsShape() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <React.Fragment>
          <Divider>Surround</Divider>
          <Row>
            <Col>
              <Checkbox
                style={{ float: 'right', marginBottom: 10 }}
                checked={context.state.showSurround}
                onChange={context.toggleShowSurround}
              >
                Show
              </Checkbox>
            </Col>
          </Row>

          <UnitSlider
            label="Size"
            onChange={context.setCellSize}
            value={context.state.cellSize}
            min={context.state.cellSizeMin}
            max={context.state.cellSizeMax}
          />

          <UnitSlider
            label="Sides"
            disabled={!context.state.showSurround}
            onChange={context.setShapeSideCount}
            value={context.state.shapeSideCount}
            min={2}
            max={8}
            step={1}
            hideUnits
          />

          <Divider style={{ marginTop: 50 }}>Through</Divider>
          <Row>
            <Col>
              <Checkbox
                style={{ float: 'right', marginBottom: 10 }}
                checked={context.state.throughHoleExists}
                onChange={context.toggleThroughHoleExists}
              >
                Show
              </Checkbox>
            </Col>
          </Row>

          <UnitSlider
            label="Radius"
            onChange={context.setThroughHoleRadius}
            value={context.state.throughHoleRadius}
            min={0}
            max={context.state.cellSize}
          />
          <UnitSlider
            label="X"
            onChange={context.setThroughHoleX}
            value={context.state.throughHoleX}
            min={0}
            max={context.state.cellSize}
          />
          <UnitSlider
            label="Y"
            onChange={context.setThroughHoleY}
            value={context.state.throughHoleY}
            min={0}
            max={context.state.cellSize}
          />
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsShape;
