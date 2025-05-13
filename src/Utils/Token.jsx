export const getAuthToken = () => {
    return localStorage.getItem("token")
}

export const clearAuthToken = () => {
    return localStorage.removeItem('token');
}