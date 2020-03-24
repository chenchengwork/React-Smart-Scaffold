module.exports = {
    'hack': `true;@import "${require.resolve('antd/lib/style/color/colorPalette.less')}";`,
    // ...require('./light_theme'),            // 亮色主题
    ...require('./dark_theme'),          // 暗黑色主题

    '@font-size-base': '12px',              // 修改基础字体大小
};
