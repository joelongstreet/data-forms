const centimetersPerInch = 2.54;
const inchesPerCentimenter = 0.393701;
const pixelsPerInch = 72;
const svgDownloadContainerId = 'svg-download-container';

function convertUnitsToPixels(float, unit) {
  if (unit === 'in') {
    return float * pixelsPerInch;
  }
  if (unit === 'cm') {
    return (float * pixelsPerInch) / centimetersPerInch;
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

const svgDocumentMeta = {
  version: '1.1',
  xlinkTitle: 'DataForms',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  xmlSpace: 'preserve',
};

module.exports = {
  centimetersPerInch,
  convertDegreesToRadians,
  convertUnitsToPixels,
  getCoordsFromRadiansAndRadius,
  inchesPerCentimenter,
  pixelsPerInch,
  svgDocumentMeta,
  svgDownloadContainerId,
};
