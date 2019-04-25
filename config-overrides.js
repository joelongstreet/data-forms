const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const Styles = require('./src/Styles');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    // Overrides from here - https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
    modifyVars: {
      '@primary-color': Styles.colors[1],
      '@text-color': Styles.colors[1],
      '@heading-color': Styles.colors[1],
      '@text-color-secondary': Styles.colors[5],
      '@disabled-color': Styles.colors[5],
      '@link-color': Styles.colors[8],
      '@error-color': Styles.colors[6],
      '@label-required-color': Styles.colors[6],
      '@warning-color': Styles.colors[4],
      '@border-color-base': Styles.colors[5],
      '@border-color-split': Styles.colors[5],
      '@btn-primary-bg': Styles.colors[8],
      '@btn-primary-color': Styles.colors[0],
      '@btn-default-bg': Styles.colors[1],
      '@btn-default-color': Styles.colors[0],
      '@radio-button-bg': Styles.colors[0],
      '@radio-button-checked-bg': Styles.colors[7],
      '@radio-dot-color': Styles.colors[5],
      '@radio-button-hover-color': Styles.colors[5],
      '@checkbox-color': Styles.colors[5],
      '@checkbox-check-color': Styles.colors[7],
      '@input-bg': Styles.colors[7],
      '@input-addon-bg': Styles.colors[7],
      '@input-disabled-bg': Styles.colors[0],
      '@slider-rail-background-color': Styles.colors[7],
      '@slider-rail-background-color-hover': Styles.colors[5],
      '@slider-disabled-color': Styles.colors[5],
      '@slider-disabled-background-color': Styles.colors[5],
      '@slider-dot-border-color': Styles.colors[0],
      '@slider-handle-color': Styles.colors[0],
      '@component-background': Styles.colors[0],
    },
  }),
);
