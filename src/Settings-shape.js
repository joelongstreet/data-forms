import React from 'react';
import {
  Checkbox,
  Col,
  Divider,
  Row,
} from 'antd';

import UnitSlider from './UnitSlider';
import SettingsContext from './Settings.context';
import * as Styles from './Styles';

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

          <Divider style={Styles.divider}>Through</Divider>
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
            max={context.state.cellSize / 2}
            disabled={!context.state.throughHoleExists}
          />
          <UnitSlider
            label="X"
            onChange={context.setThroughHoleX}
            value={context.state.throughHoleX}
            min={0}
            max={context.state.cellSize}
            disabled={!context.state.throughHoleExists}
          />
          <UnitSlider
            label="Y"
            onChange={context.setThroughHoleY}
            value={context.state.throughHoleY}
            min={0}
            max={context.state.cellSize}
            disabled={!context.state.throughHoleExists}
          />

          <Divider style={Styles.divider}>Curve</Divider>
          <UnitSlider
            label="Scale"
            hideUnits
            onChange={context.setCurveScale}
            value={context.state.curveScale}
            min={-2}
            max={2}
          />
          <UnitSlider
            label="X"
            onChange={context.setCurveOffsetX}
            value={context.state.curveOffsetX}
            min={-1 * context.state.cellSize}
            max={context.state.cellSize}
          />
          <UnitSlider
            label="Y"
            onChange={context.setCurveOffsetY}
            value={context.state.curveOffsetY}
            min={-1 * context.state.cellSize}
            max={context.state.cellSize}
          />
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsShape;
