let api;

if (process.env.DEMO === true) {
  api = require('@/api/demo-api');
} else {
  api = require('@/api/api');
}

export default api;