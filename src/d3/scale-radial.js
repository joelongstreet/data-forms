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
    return (linear.domain(_), scale);
  };

  scale.range = function range(_) {
    return (linear.range(_.map(square)), scale);
  };

  return scale;
}

export default radial;
