import api from "./api";
import endpoints from "./endpoints.js";

export const getHoursFech = (fech) => {
    return api.get(endpoints.getHoursFech(fech))
}

export const getHours = () => {
    return api.get(endpoints.getHours)
}