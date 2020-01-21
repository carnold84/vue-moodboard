import api, { setAuthToken, } from '@/services/api';

export default {
  login: ({ email, password, }) => {
    return new Promise((resolve, reject) => {
      api
        .post('/users/login', { email, password, })
        .then(response => {
          const { token, } = response.data;

          setAuthToken(token);

          resolve(token);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getUser: () => {
    return new Promise((resolve, reject) => {
      api
        .get('/users')
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  setToken: setAuthToken,
};
