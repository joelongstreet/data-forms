import React, { Component } from 'react';

import Tile from './Tile';
import SettingsContext from './Settings.context';

import { convertUnitsToPixels } from './util';

class SvgPreview extends Component {
  componentDidMount() {
    // this.node.selectAll('*').remove();
  }

  componentDidUpdate() {
    // this.node.selectAll('*').remove();
  }
  
  render() {
    function getDatum(context) {
      return context.state.datum.split('\n');
    }

    return <SettingsContext.Consumer>
      {(context) => (
        <svg ref={node => this.node = node}
          width={convertUnitsToPixels(context.state.cellWidth, context.state.units)*getDatum(context).length}
          height={convertUnitsToPixels(context.state.cellHeight, context.state.units)}
        >
          { context.state.datum.split('\n').map((data, i) => {
            return <Tile
              key={i}
              xOffset={convertUnitsToPixels(i*context.state.cellWidth, context.state.units)}
              yOffset={0}
              cellWidth={convertUnitsToPixels(context.state.cellWidth, context.state.units)}
              cellHeight={convertUnitsToPixels(context.state.cellHeight, context.state.units)}
              throughHoleExists={context.state.throughHole}
              throughHoleRadius={context.state.throughHoleRadius}
              throughHoleX={context.state.throughHoleX}
              throughHoleY={context.state.throughHoleX}
              shapeSideCount={context.state.shapeSideCount}
              node={this.node}
              data={data}
            />;
          }) }
        </svg>
      )}
    </SettingsContext.Consumer>;
  };
}

export default SvgPreview;