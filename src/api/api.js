import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const TOKEN_NAME = 'moodboard_token';
const USER_ID = 'moodboard_user_id';
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

const request = async (path, type = 'get', params) => {
  return new Promise((resolve, reject) => {
    let request = undefined;

    if (type === 'get') {
      request = instance.get(path, params);
    } else if (type === 'post') {
      request = instance.post(path, params);
    } else if (type === 'delete') {
      request = instance.delete(path, params);
    } else if (type === 'put') {
      request = instance.put(path, params);
    }

    request
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
  
export const auth = {
  getToken: () => {
    return authToken;
  },
  getUser: async () => {
    const response = await request(`/users/${userId}`);
    return response.data;
  },
  login: async ({ email, password }) => {
    const response = await request('/users/login', 'post', { email, password });
    const { id, token } = response.data;

    localStorage.setItem(TOKEN_NAME, token);
    userId = id;
    localStorage.setItem(USER_ID, userId);
    setToken(token);

    return token;
  },
  logout: async () => {
    return new Promise(resolve => {
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
    const response = await request('/images', 'post', image);
    
    return response.data;
  },
  delete: async id => {
    const response = await request(`/images/${id}`, 'delete');
    
    return response.data;
  },
  link: async ({imageId, projectId}) => {
    const response = await request('/images/link-to-project', 'post', {
      imageId,
      projectId,
    });
    
    return response.data;
  },
  list: async ({exclude, ids}) => {
    const response = await request('/images', 'get', {
      params: {
        exclude,
        ids,
      },
    });

    return response.data;
  },
  unlink: async ({imageId, projectId}) => {
    const response = await request('/images/unlink-from-project', 'post', {
      imageId,
      projectId,
    });
    
    return response.data;
  },
  update: async image => {
    const response = await request('/images', 'put', image);
    
    return response.data;
  },
};

export const links = {
  create: async link => {
    const response = await request('/links', 'post', link);
    
    return response.data;
  },
  delete: async id => {
    const response = await request(`/links/${id}`, 'delete');
    
    return response.data;
  },
  link: async ({linkId, projectId}) => {
    const response = await request('/links/link-to-project', 'post', {
      linkId,
      projectId,
    });
    
    return response.data;
  },
  list: async ({exclude, ids}) => {
    const response = await request('/links', 'get', {
      params: {
        exclude,
        ids,
      },
    });

    return response.data;
  },
  unlink: async ({linkId, projectId}) => {
    const response = await request('/links/unlink-from-project', 'post', {
      linkId,
      projectId,
    });
    
    return response.data;
  },
  update: async link => {
    const response = await request('/links', 'put', link);
    
    return response.data;
  },
};
  
export const projects = {
  create: async project => {
    const response = await request('/projects', 'post', project);
    
    return response.data;
  },
  delete: async id => {
    const response = await request(`/projects/${id}`, 'delete');
    
    return response.data;
  },
  list: async () => {
    const response = await request('/projects');
    
    return response.data;
  },
  update: async project => {
    const response = await request('/projects', 'put', project);
    
    return response.data;
  },
};
