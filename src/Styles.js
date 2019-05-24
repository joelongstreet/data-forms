const breaks = {
  default: {
    headerHeight: 77,
    footerHeight: 75,
  },
  large: {
    width: 1000,
    headerHeight: 77,
  },
  medium: { // tablets
    width: 769,
    headerHeight: 50,
    footerHeight: 50,
  },
  small: { // phones
    width: 450,
    headerHeight: 50,
    footerHeight: 50,
  },
};

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
  'rgb(26, 31, 42)', // dark black
];

const divider = { marginTop: 75 };
const previewVerticalCellPadding = 50;
const displayFont = "'Share Tech Mono', monospace";

module.exports = {
  breaks,
  colors,
  displayFont,
  divider,
  previewVerticalCellPadding,
};
