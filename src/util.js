const centimetersPerInch = 2.54;
const inchesPerCentimenter = 0.393701;

const testElement = document.createElement('div');
testElement.setAttribute('id', 'test-element');
testElement.setAttribute('style', 'width: 1in; height: 1in');
document.body.appendChild(testElement);

const pixelsPerInch = testElement.offsetWidth + testElement.offsetWidth / window.devicePixelRatio;

function convertUnitsToPixels(float, unit) {
  if (unit === 'in') {
    return float * pixelsPerInch;
  }
  if (unit === 'cm') {
    return float * pixelsPerInch * centimetersPerInch;
  }

  throw new Error(`${unit} unit not supported`);
}

function convertDegreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// pass in a radian and the radius of a circle
// get back an array with 2 items: [xPosition, yPosition]
function getCoordsFromRadiansAndRadius(radian, radius) {
  return [
    Math.round(Math.cos(radian) * radius) + radius,
    Math.round(Math.sin(radian) * radius) + radius,
  ];
}

module.exports = {
  convertUnitsToPixels,
  centimetersPerInch,
  inchesPerCentimenter,
  convertDegreesToRadians,
  getCoordsFromRadiansAndRadius,
};
