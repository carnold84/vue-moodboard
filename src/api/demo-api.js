const STORE_NAME = 'vue-moodboard-demo';

let data;

getData = async () => {
  return await localStorage.getItem(STORE_NAME);
};

saveData = async data => {
  return await localStorage.setItem(STORE_NAME, data);
};

init = async () => {
  data = await getData();

  if (data === null) {
    const initialData = {
      auth: {
        token: undefined,
        user: undefined,
      },
      images: {
        images: undefined,
      },
      projects: {
        projects: undefined,
      },
    };

    data = await saveData(initialData);
  }
};

init();
  
export const auth = {
  getUser: () => {
    return new Promise((resolve, reject) => {
      instance
        .get('/users')
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
          const { token } = response.data;
  
          this.setAuthToken(token);
  
          resolve(token);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  setAuthToken: token => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
