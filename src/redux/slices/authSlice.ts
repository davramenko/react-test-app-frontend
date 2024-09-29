import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {api} from '../../api/constants'
import {setError, setValidationErrors} from "./errorSlice";
import errorMessageExtractor from "../../utils/errorMessageExtractor";

export interface UserCredentials {
    username: string;
    password: string;
}

export interface IUser {
    id: number | undefined;
    email: string | undefined;
    password: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    phone: string | undefined;
    email_verified_at: string | undefined;
    new_password: string | undefined;
    new_password_confirmation: string | undefined;
}

export function createUser() : IUser {
    return {
        id: 0,
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
        email_verified_at: undefined,
        new_password: undefined,
        new_password_confirmation: undefined,
    };
}

const initialState = {
    token: "",
    emailChecked: false,
    emailConfirmationStatus: 'pending' as string,
    credentials: {
        username: "",
        password: "",
    },
    user: null as IUser | null,
};

export const checkLogin = createAsyncThunk(
    'auth/login',
    async (postData: UserCredentials, thunkAPI) => {
        try {
            const res: AxiosResponse = await axios.post(
                api.baseUrl + api.login,
                postData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            console.log('checkLogin: token: ', res.data);
            return res.data;
        } catch (error: any) {
            console.error(error);
            thunkAPI.dispatch(setError(errorMessageExtractor(error)));
        }
    }
);

export const checkEmail = createAsyncThunk(
    'auth/check_email',
    async (postData: string, thunkAPI) => {
        try {
            const res: AxiosResponse = await axios.post(
                api.baseUrl + api.checkEmail,
                {email: postData},
                {
                    headers: {
                        "Content-Type": "application/ld+json",
                    }
                }
            );
            console.log('checkEmail: success', res);
            return res.data;
        } catch (error: any) {
            console.error('checkEmail: error', error);
            thunkAPI.dispatch(setError(errorMessageExtractor(error)));
            // return thunkAPI.rejectWithValue(error);
        }
    }
);

export const finishRegistration = createAsyncThunk(
    'auth/finish_registration',
    async (postData: any, thunkAPI) => {
        try {
            const res: AxiosResponse = await axios.post(
                api.baseUrl + api.register,
                postData,
                {
                    headers: {
                        "Content-Type": "application/ld+json",
                    }
                }
            );
            console.log('finishRegistration: success', res);
            return res.data;
        } catch (error: any) {
            console.error('finishRegistration: error', error);
            if (error.response?.data?.violations) {
                thunkAPI.dispatch(setValidationErrors(error.response.data.violations));
            } else {
                thunkAPI.dispatch(setError(errorMessageExtractor(error)));
            }
        }
    }
);

export const confirmEmail = createAsyncThunk(
    'auth/confirm_email',
    async (postData: any, thunkAPI) => {
        try {
            const res: AxiosResponse = await axios.post(
                api.baseUrl + api.confirmEmail,
                postData,
                {
                    headers: {
                        "Content-Type": "application/ld+json",
                    }
                }
            );
            console.log('confirmEmail: success', res);
            return res.data;
        } catch (error: any) {
            console.error('confirmEmail: error', error);
            thunkAPI.dispatch(setEmailConfirmationStatus('error'));
            thunkAPI.dispatch(setError(errorMessageExtractor(error)));
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    'auth/get_me',
    async (_: any, thunkAPI) => {
        const token = localStorage.getItem('authToken');
        console.log('getCurrentUser: token: ', token);
        try {
            const res: AxiosResponse = await axios.get(
                api.baseUrl + api.getMe,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('getCurrentUser: success', res);
            return res.data;
        } catch (error: any) {
            console.error('getCurrentUser: error', error);
            thunkAPI.dispatch(setError(errorMessageExtractor(error)));
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            return initialState;
        },
        setEmailUnchecked: (state) => {
            state.emailChecked = false;
        },
        setEmailConfirmationStatus: (state, action) => {
            state.emailConfirmationStatus = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkLogin.fulfilled, (state, action) => {
            console.log('checkLogin.fulfilled', action.payload);
            if (action.payload) {
                localStorage.setItem('authToken', action.payload.token);
                state.token = action.payload.token;
            }
        });
        builder.addCase(checkEmail.fulfilled, (state, action) => {
            console.log('checkEmail.fulfilled', action.payload);
            if (action.payload) {
                // TODO: process response
                if (action.payload.success) {
                    state.emailChecked = true;
                }
            }
        });
        builder.addCase(finishRegistration.fulfilled, (state, action) => {
            console.log('finishRegistration.fulfilled', action.payload);
            if (action.payload) {
                state.user = action.payload;
            }
        });
        builder.addCase(confirmEmail.fulfilled, (state, action) => {
            console.log('confirmEmail.fulfilled', action.payload);
            if (action.payload) {
                // TODO: process response
                if (action.payload.success) {
                    state.emailConfirmationStatus = 'success';
                }
            }
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            console.log('getCurrentUser.fulfilled', action.payload);
            if (action.payload) {
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            }
        });
    }
});

export const {
    logout,
    setEmailUnchecked,
    setEmailConfirmationStatus,
} = authSlice.actions;

// export const selectAuthToken = (state: any) => state.auth.token;
export const selectAuthEmailChecked = (state: any) => state.auth?.emailChecked;
export const selectAuthUser = (state: any) => state.auth?.user;
export const selectAuthEmailConfirmationStatus = (state: any) => state.auth?.emailConfirmationStatus;

export default authSlice.reducer;
