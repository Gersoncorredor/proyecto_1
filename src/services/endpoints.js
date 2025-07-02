
const endpoints = {
    /* users */
    getUser: "/user",
    getUserId: (id) => `/user/${id}`,
    createUser: "/user",
    updateUser: (id) => `/user/${id}`,
    deleteUser: "/user",
    getUserByRole: (rol) => `/user?rol=${rol}`,
    /* hours */
    getHoursFech: (Fech) => `/hours?fecha=${Fech}`,
    createHour: "/hours",
    deleteHourId: (id) => `/hours/${id}`,
    /* Tipos de Consulta */
    getTipoConsulta: "/tipoConsulta",

}

export default endpoints;