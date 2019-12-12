import api, { setAuthToken } from "@/services/api";

export default {
  login: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      api
        .post(`/login`, { email, password })
        .then(response => {
          const {
            success: { token }
          } = response.data;

          setAuthToken(token);

          resolve(token);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  setToken: setAuthToken
};
