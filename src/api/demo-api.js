import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

const STORE_NAME = 'vue-moodboard-demo';
const DELAY = 500;

const instance = localforage.createInstance({
  name: STORE_NAME,
});

const TOKEN_NAME = 'aura_demo_token';
const currentUser = {
  email: undefined,
  name: 'Demo',
};
const authToken = localStorage.getItem(TOKEN_NAME);

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
      const email = localStorage.getItem(TOKEN_NAME);
      user.email = email;

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
          localStorage.setItem(TOKEN_NAME, email);
  
          resolve({msg: 'ok', token: 'token'});
        } else {
          reject({msg: 'Email or password is incorrect'});
        }
      }, DELAY);
    });
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

const removeImageToProject = async (imageId, projectId) => {
  let imageProjects = await instance.getItem('imageProjects');

  imageProjects = imageProjects.filter(element => {
    return element.imageId === imageId && element.projectId === projectId;
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

    setTimeout(() => {
      resolve(image);
    }, DELAY);
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
    let images = await instance.getItem('images');

    const image = images.filter(element => {
      return element.id === id;
    })[0];

    if (image) {
      if (projectId) {
        await removeImageFromProject(image.id, projectId);
      }

      const newImages = images.filter(element => {
        return element.id !== image.id;
      });

      await instance.setItem('images', newImages);
    }

    setTimeout(() => {
      resolve({image, msg: 'Image deleted successfully'});
    }, DELAY);
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
