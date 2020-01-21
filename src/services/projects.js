import api from '@/services/api';

export default {
  create: async project => {
    return new Promise((resolve, reject) => {
      api
        .post('/projects', project)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delete: async id => {
    return new Promise((resolve, reject) => {
      api
        .delete(`/projects/${id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getAllProjects: async () => {
    return new Promise((resolve, reject) => {
      api
        .get('/projects')
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getProject: async id => {
    return new Promise((resolve, reject) => {
      api
        .get(`/projects/${id}`)
        .then(response => {
          resolve(response.data[0]);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
