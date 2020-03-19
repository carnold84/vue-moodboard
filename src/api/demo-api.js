import localforage from 'localforage';

const STORE_NAME = 'vue-moodboard-demo';

const instance = localforage.createInstance({
  name: STORE_NAME,
});

const TOKEN_NAME = 'aura_demo_token';
const authToken = localStorage.getItem(TOKEN_NAME);

let currentUser = {
  email: undefined,
  name: 'Demo',
};
  
export const auth = {
  getToken: () => {
    return authToken;
  },
  getUser: () => {
    return new Promise(async (resolve, reject) => {
      let user = await instance.getItem('user');
      
      if (!user) {
        user = await instance.setItem('user', currentUser);
      }

      setTimeout(() => {
        resolve(user);
      }, 2000);
    });
  },
  login: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password === 'demo123') {
          currentUser.email = email;
          localStorage.setItem(TOKEN_NAME, 'token');
  
            resolve({msg: 'ok', token: 'token'});
        } else {
          reject({msg: 'Email or password is incorrect'});
        }
      }, 2000);
    });
  },
};

export const images = {
  create: async image => {
    return new Promise((resolve, reject) => {
      instance
        .post('/images', image)
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
      instance
        .delete(`/images/${id}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getAllImages: async () => {
    return new Promise((resolve, reject) => {
      instance
        .get('/images')
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getImagesByProject: async projectId => {
    return new Promise((resolve, reject) => {
      instance
        .get(`/images/project/${projectId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getImage: async id => {
    return new Promise((resolve, reject) => {
      instance
        .get(`/images/${id}`)
        .then(response => {
          resolve(response.data[0]);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
  
export const projects = {
  create: async project => {
    return new Promise((resolve, reject) => {
      instance
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
      instance
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
      instance
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
      instance
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
