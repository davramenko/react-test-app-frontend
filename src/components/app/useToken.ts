import { useState } from 'react';
// Let's forget about this

export interface IUserToken {
    token: string;
}

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        if (!tokenString) {
            return null;
        }
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: IUserToken): void => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}