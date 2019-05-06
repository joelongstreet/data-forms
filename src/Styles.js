const colors = [
  'rgb(36, 41, 52)', // black
  'rgb(203, 204, 198)', // white
  'rgb(212, 193, 253)', // purple
  'rgb(187, 229, 131)', // green
  'rgb(244, 205, 130)', // gold
  'rgb(90, 101, 112)', // grey (white)
  'rgb(240, 135, 123)', // red,
  'rgb(45, 55, 65)', // grey (black)
  'rgb(255, 255, 255)', // white white
  'rgb(95,202,224)', // blue
];

const divider = { marginTop: 75 };
const previewVerticalCellPadding = 50;
const headerHeight = 77;
const footerHeight = 75;

function getLegendLineStyle(styleColorIndex) {
  return {
    borderTop: `1px solid ${colors[styleColorIndex]}`,
    width: 10,
    float: 'left',
    marginTop: 10,
    marginRight: 10,
  };
}

module.exports = {
  colors,
  headerHeight,
  footerHeight,
  divider,
  previewVerticalCellPadding,
  getLegendLineStyle,
};
