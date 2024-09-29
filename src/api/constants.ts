export const api = {
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    getMe: '/auth/me',
    login: "/login_check",
    checkEmail: "/public/check-email-available",
    register: "/public/register",
    confirmEmail: "/public/confirm-email",
};
