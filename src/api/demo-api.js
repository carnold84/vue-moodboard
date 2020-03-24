import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

const STORE_NAME = 'vue-moodboard-demo';
const DELAY = 500;

const instance = localforage.createInstance({
  name: STORE_NAME,
});

const TOKEN_NAME = 'aura_demo_token';
const authToken = localStorage.getItem(TOKEN_NAME);

const init = async () => {
  let images = await instance.getItem('images');
  if (!images) {
    await instance.setItem('images', []);
  }
  let projects = await instance.getItem('projects');
  if (!projects) {
    await instance.setItem('projects', []);
  }
  let user = await instance.getItem('user');
  if (!user) {
    await instance.setItem('user', currentUser);
  }
};

init();
  
export const auth = {
  getToken: () => {
    return authToken;
  },
  getUser: () => {
    return new Promise(async (resolve, reject) => {
      let user = await instance.getItem('user');

      setTimeout(() => {
        resolve(user);
      }, DELAY);
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
      }, DELAY);
    });
  },
};

export const images = {
  create: async image => {
    return new Promise(async (resolve, reject) => {
      let images = await instance.getItem('images');

      const id = uuidv4();
      const newImage = {
        ...image,
        fileName: image.url,
        id,
      };

      images.push(newImage);

      await instance.setItem('images', images);

      setTimeout(() => {
        resolve({image: newImage, msg: 'Image created successfully'});
      }, DELAY);
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
    return new Promise(async (resolve, reject) => {
      let projects = await instance.getItem('projects');

      const id = uuidv4();
      const newProject = {
        ...project,
        id,
      };

      projects.push(newProject);

      await instance.setItem('projects', projects);

      setTimeout(() => {
        resolve({project: newProject, msg: 'Project created successfully'});
      }, DELAY);
    });
  },
  delete: async id => {
    return new Promise(async (resolve, reject) => {
      let projects = await instance.getItem('projects');

      const project = projects.filter(element => {
        return element.id === id;
      })[0];

      if (project) {
        const newProjects = projects.filter(element => {
          return element.id !== project.id;
        });
  
        await instance.setItem('projects', newProjects);
      }

      setTimeout(() => {
        resolve({project, msg: 'Project deleted successfully'});
      }, DELAY);
    });
  },
  getAllProjects: async () => {
    return new Promise(async (resolve, reject) => {
      let projects = await instance.getItem('projects');

      setTimeout(() => {
        resolve(projects);
      }, DELAY);
    });
  },
  getProject: async id => {
    return new Promise(async (resolve, reject) => {
      let projects = await instance.getItem('projects');
      
      const project = projects.filter(element => {
        return element.id === id;
      })[0];

      setTimeout(() => {
        resolve(project);
      }, DELAY);
    });
  },
};
