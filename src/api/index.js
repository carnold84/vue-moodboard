let api;

if (process.env.VUE_APP_DEMO === 'true') {
  api = require('@/api/demo-api');
} else {
  api = require('@/api/api');
}

export default api;