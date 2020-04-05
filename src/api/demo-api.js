import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

const DELAY = 500;
const STORE_NAME = 'vue-moodboard-demo';
const TOKEN_NAME = 'vue-moodboard-demo-token';
const USER_ID = 'vue-moodboard-demo-user-id';

const instance = localforage.createInstance({
  name: STORE_NAME,
});

const authToken = localStorage.getItem(TOKEN_NAME);
let userId = localStorage.getItem(USER_ID);

const init = async () => {
  let images = await instance.getItem('images');
  if (!images) {
    await instance.setItem('images', []);
  }
  let imagesProjects = await instance.getItem('imagesProjects');
  if (!imagesProjects) {
    await instance.setItem('imagesProjects', []);
  }
  let links = await instance.getItem('links');
  if (!links) {
    await instance.setItem('links', []);
  }
  let linksProjects = await instance.getItem('linksProjects');
  if (!linksProjects) {
    await instance.setItem('linksProjects', []);
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
  let imagesProjects = await instance.getItem('imagesProjects');

  imagesProjects.push({
    imageId,
    projectId,
  });

  await instance.setItem('imagesProjects', imagesProjects);
};

const removeImageFromProject = async (imageId, projectId) => {
  let imagesProjects = await instance.getItem('imagesProjects');

  imagesProjects = imagesProjects.filter(element => {
    return element.imageId !== imageId && element.projectId !== projectId;
  });

  await instance.setItem('imagesProjects', imagesProjects);
};

const getImageIdsByProject = async (projectId) => {
  let imagesProjects = await instance.getItem('imagesProjects');

  const images = imagesProjects.filter(element => {
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
  link: async ({imageId, projectId}) => {
    return new Promise(async (resolve, reject) => {
      await addImageToProject(imageId, projectId);

      setTimeout(() => {
        resolve({ ids: { imageId, projectId }, msg: 'Image linked successfully' });
      }, DELAY);
    });
  },
  list: async () => {
    return new Promise(async (resolve, reject) => {
      let images = await instance.getItem('images');

      setTimeout(() => {
        resolve(images);
      }, DELAY);
    });
  },
  unlink: async ({imageId, projectId}) => {
    return new Promise(async (resolve, reject) => {
      await removeImageFromProject(imageId, projectId);

      setTimeout(() => {
        resolve({ ids: { imageId, projectId }, msg: 'Image unlinked successfully' });
      }, DELAY);
    });
  },
};

const addLinkToProject = async (linkId, projectId) => {
  let linksProjects = await instance.getItem('linksProjects');

  linksProjects.push({
    linkId,
    projectId,
  });

  await instance.setItem('linksProjects', linksProjects);
};

const removeLinkFromProject = async (linkId, projectId) => {
  let linksProjects = await instance.getItem('linksProjects');

  linksProjects = linksProjects.filter(element => {
    return element.linkId !== linkId && element.projectId !== projectId;
  });

  await instance.setItem('linksProjects', linksProjects);
};

const getLinkIdsByProject = async (projectId) => {
  let linksProjects = await instance.getItem('linksProjects');

  const links = linksProjects.filter(element => {
    return element.projectId === projectId;
  });

  const linkIds = links.map(element => {
    return element.linkId;
  });

  return linkIds;
};

const getLink = async id => {
  return new Promise(async (resolve, reject) => {
    let links = await instance.getItem('links');
    
    const link = links.filter(element => {
      return element.id === id;
    })[0];

    resolve(link);
  });
};

export const links = {
  create: async data => {
    return new Promise(async (resolve, reject) => {
      let links = await instance.getItem('links');

      const id = uuidv4();
      const {projectId} = data;
      const newLink = {
        ...data,
        id,
      };

      if (projectId) {
        await addLinkToProject(id, projectId);
      }

      links.push(newLink);

      await instance.setItem('links', links);

      setTimeout(() => {
        resolve({link: newLink, msg: 'Link created successfully'});
      }, DELAY);
    });
  },
  delete: async id => {
    return new Promise(async (resolve, reject) => {
      const link = await getLink(id);

      if (link) {
        const {id, projectId} = link;

        if (projectId) {
          await removeLinkFromProject(id, projectId);
        }
        
        let links = await instance.getItem('links');

        const newLinks = links.filter(element => {
          return element.id !== id;
        });

        await instance.setItem('links', newLinks);
      }

      setTimeout(() => {
        resolve({link, msg: 'Link deleted successfully'});
      }, DELAY);
    });
  },
  link: async ({linkId, projectId}) => {
    return new Promise(async (resolve, reject) => {
      await addLinkToProject(linkId, projectId);

      setTimeout(() => {
        resolve({ ids: { linkId, projectId }, msg: 'Link linked successfully' });
      }, DELAY);
    });
  },
  list: async () => {
    return new Promise(async (resolve, reject) => {
      let links = await instance.getItem('links');

      setTimeout(() => {
        resolve(links);
      }, DELAY);
    });
  },
  unlink: async ({linkId, projectId}) => {
    return new Promise(async (resolve, reject) => {
      await removeLinkFromProject(linkId, projectId);

      setTimeout(() => {
        resolve({ ids: { linkId, projectId }, msg: 'Link unlinked successfully' });
      }, DELAY);
    });
  },
};

const getProject = async id => {
  return new Promise(async (resolve, reject) => {
    let projects = await instance.getItem('projects');
    
    let project = projects.filter(element => {
      return element.id === id;
    })[0];

    project.imageIds = await getImageIdsByProject(project.id);
    project.linkIds = await getLinkIdsByProject(project.id);

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
        linkIds: [],
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
  list: async () => {
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
};
