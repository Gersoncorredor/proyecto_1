import api from "./api.js";
import endpoints from "./endpoints.js";

export const getUser = () => {
  return api.get(endpoints.getUser);
};

export const getUserId = (id) => {
  return api.get(endpoints.getUserId(id));
};

export const createUser = (user) => {
  return api.post(endpoints.createUser, user);
};

export const updateUser = (id, user) => {
  return api.put(endpoints.updateUser(id), user);
};
