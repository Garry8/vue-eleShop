//vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .loader("eslint-loader")
      .tap(options => {
        options.fix = true;
        // eslint-disable-next-line semi
        return options;
      });
  }
};
