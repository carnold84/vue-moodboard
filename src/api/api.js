import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const TOKEN_NAME = 'aura_token';
const USER_ID = 'aura_user_id';
const authToken = localStorage.getItem(TOKEN_NAME);
let userId = localStorage.getItem(USER_ID);

const setToken = token => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearToken = () => {
  instance.defaults.headers.common['Authorization'] = undefined;
};

if (authToken) {
  setToken(authToken);
}
  
export const auth = {
  getToken: () => {
    return authToken;
  },
  getUser: () => {
    return new Promise((resolve, reject) => {
      instance
        .get(`/users/${userId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  login: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      instance
        .post('/users/login', { email, password })
        .then(response => {
          const { id, token } = response.data;
  
          localStorage.setItem(TOKEN_NAME, token);
          userId = id;
          localStorage.setItem(USER_ID, userId);
          setToken(token);
  
          resolve(token);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  logout: async () => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem(TOKEN_NAME);
      userId = undefined;
      localStorage.removeItem(USER_ID);
      clearToken();

      resolve();
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
