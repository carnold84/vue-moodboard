module.exports = {
  configureWebpack: {
    resolve: {
      mainFiles: ['index', 'Index'],
    },
  },
  outputDir: process.env.VUE_APP_OUTPUT_DIR || 'dist',
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
};