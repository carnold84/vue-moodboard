import api from "@/services/api";

export default {
  getAllProjects: async () => {
    return new Promise((resolve, reject) => {
      api
        .get("/projects")
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
