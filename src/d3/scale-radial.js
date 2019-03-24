import * as d3 from 'd3';

function square(x) {
  return x * x;
}

function radial() {
  const linear = d3.scaleLinear();

  function scale(x) {
    return Math.sqrt(linear(x));
  }

  scale.domain = function domain(_) {
    return arguments.length ? (linear.domain(_), scale) : linear.domain();
  };

  scale.range = function range(_) {
    return arguments.length ? (linear.range(_.map(square)), scale) : linear.range().map(Math.sqrt);
  };

  return scale;
}

export default radial;
