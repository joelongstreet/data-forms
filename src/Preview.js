import React, { Component } from 'react';
import { ScrollToHOC } from 'react-scroll-to';

import * as Styles from './Styles';
import { convertUnitsToPixels } from './util';
import SettingsContext from './Settings.context';
import Tiles from './Tiles';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.scrollArea = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    if (props.textAreaHighlightIndex !== prevProps.textAreaHighlightIndex) {
      const cellSize = convertUnitsToPixels(props.cellSize, props.units);
      const cellWithPadding = cellSize + Styles.previewVerticalCellPadding;
      const y = props.textAreaHighlightIndex * cellWithPadding - cellWithPadding;
      props.scrollTo({
        ref: this.scrollArea, y, smooth: true,
      });
    }
  }

  render() {
    return (
      <div
        ref={this.scrollArea}
        style={{
          position: 'relative',
          height: '100%',
          overflow: 'scroll',
        }}
      >
        <SettingsContext.Consumer>
          {context => (
            <Tiles
              curveOffsetX={context.state.curveOffsetX}
              curveOffsetY={context.state.curveOffsetY}
              curveRotation={context.state.curveRotation}
              curveScaleX={context.state.curveScaleX}
              curveScaleY={context.state.curveScaleY}
              curveType={context.state.curveType}
              cellSize={context.state.cellSize}
              datum={context.state.datum}
              effectType={context.state.effectType}
              etchWidth={context.state.etchWidth}
              forceClose={context.state.forceClose}
              isDramatic={context.state.isDramatic}
              isSingleton={context.state.isSingleton}
              lineType={context.state.lineType}
              pageHeight={context.state.pageHeight}
              pageWidth={context.state.pageWidth}
              shapeSideCount={context.state.shapeSideCount}
              showSurround={context.state.showSurround}
              throughHoleExists={context.state.throughHoleExists}
              throughHoleRadius={context.state.throughHoleRadius}
              throughHoleX={context.state.throughHoleX}
              throughHoleY={context.state.throughHoleY}
              units={context.state.units}
            />
          )}
        </SettingsContext.Consumer>
      </div>
    );
  }
}

export default ScrollToHOC(Preview);
