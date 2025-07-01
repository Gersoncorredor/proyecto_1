
const endpoints = {
    getUser: "/user",
    getUserId: (id) => `/user/${id}`,
    createUser: "/user",
    updateUser: (id) => `/user/${id}`,
    deleteUser: "/user",
}

export default endpoints;