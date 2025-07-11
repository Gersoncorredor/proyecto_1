import api from "./api";
import endpoints from "./endpoints";

export const schedule = (data) => {
  return api.post(endpoints.schedule, data);
};

export const getSchedule = () => {
    return api.get(endpoints.getSchedule)
}