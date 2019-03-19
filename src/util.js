const centimetersPerInch = 2.54;
const inchesPerCentimenter = 0.393701;


const testElement = document.createElement('div');
testElement.setAttribute('id', 'test-element');
testElement.setAttribute('style', 'width: 1in; height: 1in');
document.body.appendChild(testElement);

const pixelsPerInch = testElement.offsetWidth;

function convertUnitsToPixels(float, unit) {
  if (unit === 'in') {
    return float * pixelsPerInch;
  }
  if (unit === 'cm') {
    return float * pixelsPerInch * centimetersPerInch;
  }

  throw new Error(`${unit} unit not supported`);
}

module.exports = {
  convertUnitsToPixels,
  centimetersPerInch,
  inchesPerCentimenter
};
