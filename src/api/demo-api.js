import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

const STORE_NAME = 'vue-moodboard-demo';
const USER_ID = 'vue-moodboard_user_id';
const DELAY = 500;

const instance = localforage.createInstance({
  name: STORE_NAME,
});

const TOKEN_NAME = 'aura_demo_token';
const authToken = localStorage.getItem(TOKEN_NAME);
let userId = localStorage.getItem(USER_ID);

const init = async () => {
  let images = await instance.getItem('images');
  if (!images) {
    await instance.setItem('images', []);
  }
  let imageProjects = await instance.getItem('imageProjects');
  if (!imageProjects) {
    await instance.setItem('imageProjects', []);
  }
  let projects = await instance.getItem('projects');
  if (!projects) {
    await instance.setItem('projects', []);
  }
  let users = await instance.getItem('users');
  if (!users) {
    await instance.setItem('users', [
      {
        email: undefined,
        name: 'Demo',
      },
    ]);
  }
};

init();
  
export const auth = {
  getToken: () => {
    return authToken;
  },
  getUser: () => {
    return new Promise(async (resolve, reject) => {
      let users = await instance.getItem('users');
      const email = localStorage.getItem(TOKEN_NAME);
      let user = users[userId];
      user.email = email;

      setTimeout(() => {
        resolve(user);
      }, DELAY);
    });
  },
  login: ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      let isSuccessful = false;

      if (
        email === process.env.VUE_APP_DEMO_EMAIL &&
        password === process.env.VUE_APP_DEMO_PASSWORD
      ) {
        localStorage.setItem(TOKEN_NAME, email);
        userId = 0;
        localStorage.setItem(USER_ID, userId);

        resolve({id: userId, msg: 'ok', token: 'token'});
      }

      setTimeout(() => {
        if (isSuccessful) {
          resolve({msg: 'ok', token: 'token'});
        } else {
          reject({msg: 'Email or password is incorrect'});
        }
      }, DELAY);
    });
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_NAME);
    userId = undefined;
    localStorage.removeItem(USER_ID);
  },
};

const addImageToProject = async (imageId, projectId) => {
  let imageProjects = await instance.getItem('imageProjects');

  imageProjects.push({
    imageId,
    projectId,
  });

  await instance.setItem('imageProjects', imageProjects);
};

const removeImageFromProject = async (imageId, projectId) => {
  let imageProjects = await instance.getItem('imageProjects');

  imageProjects = imageProjects.filter(element => {
    return element.imageId !== imageId && element.projectId !== projectId;
  });

  await instance.setItem('imageProjects', imageProjects);
};

const getImageIdsByProject = async (projectId) => {
  let imageProjects = await instance.getItem('imageProjects');

  const images = imageProjects.filter(element => {
    return element.projectId === projectId;
  });

  const imageIds = images.map(element => {
    return element.imageId;
  });

  return imageIds;
};

const getImage = async id => {
  return new Promise(async (resolve, reject) => {
    let images = await instance.getItem('images');
    
    const image = images.filter(element => {
      return element.id === id;
    })[0];

    resolve(image);
  });
};

export const images = {
  create: async data => {
    return new Promise(async (resolve, reject) => {
      let images = await instance.getItem('images');

      const id = uuidv4();
      const {projectId, url} = data;
      const newImage = {
        ...data,
        fileName: url,
        id,
      };

      if (projectId) {
        await addImageToProject(id, projectId);
      }

      images.push(newImage);

      await instance.setItem('images', images);

      setTimeout(() => {
        resolve({image: newImage, msg: 'Image created successfully'});
      }, DELAY);
    });
  },
  delete: async id => {
    return new Promise(async (resolve, reject) => {
      const image = await getImage(id);

      if (image) {
        const {id, projectId} = image;

        if (projectId) {
          await removeImageFromProject(id, projectId);
        }
        
        let images = await instance.getItem('images');

        const newImages = images.filter(element => {
          return element.id !== id;
        });

        await instance.setItem('images', newImages);
      }

      setTimeout(() => {
        resolve({image, msg: 'Image deleted successfully'});
      }, DELAY);
    });
  },
  getAllImages: async () => {
    return new Promise(async (resolve, reject) => {
      let images = await instance.getItem('images');

      setTimeout(() => {
        resolve(images);
      }, DELAY);
    });
  },
  getImagesByProject: async projectId => {
    return new Promise(async (resolve, reject) => {
      const imageIds = await getImageIdsByProject(projectId);

      const imagePromises = imageIds.map(element => {
        return getImage(element);
      });

      const projectImages = await Promise.all(imagePromises);

      setTimeout(() => {
        resolve(projectImages);
      }, DELAY);
    });
  },
  getImage,
};

const getProject = async id => {
  return new Promise(async (resolve, reject) => {
    let projects = await instance.getItem('projects');
    
    let project = projects.filter(element => {
      return element.id === id;
    })[0];

    project.imageIds = await getImageIdsByProject(project.id);

    setTimeout(() => {
      resolve(project);
    }, DELAY);
  });
};
  
export const projects = {
  create: async project => {
    return new Promise(async (resolve, reject) => {
      let projects = await instance.getItem('projects');

      const id = uuidv4();
      const newProject = {
        ...project,
        imageIds: [],
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

      const projectPromises = projects.map(element => {
        return getProject(element.id);
      });

      projects = await Promise.all(projectPromises);

      setTimeout(() => {
        resolve(projects);
      }, DELAY);
    });
  },
  getProject,
};
