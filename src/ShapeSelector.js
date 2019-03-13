import React from 'react';

import GraphIcon from '@material-ui/icons/Timeline';
import ShapeIcon from '@material-ui/icons/Lens';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Slider from '@material-ui/lab/Slider';

function ShapeSelector(props) {

  return (
    <div>
      <ToggleButtonGroup value={props.shapeType} exclusive onChange={(e, val) => props.onShapeTypeChange(val)}>
        <ToggleButton value="polygon">
          <ShapeIcon />
        </ToggleButton>
        <ToggleButton value="outline">
          <GraphIcon />
        </ToggleButton>
        </ToggleButtonGroup>
        <br />
        { props.shapeType === 'polygon' && 
          <Slider
            value={props.shapeSideCount}
            min={1}
            max={8}
            step={1}
            onChange={(e, val) => props.onShapeSideCountChange(val)}
          />
        }
    </div>
  )
}

export default ShapeSelector;