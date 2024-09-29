import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    errorMessage: '',
    validationErrors: [],
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action) => {
            console.log('setError', action);
            state.errorMessage = action.payload;
        },
        setValidationErrors: (state, action) => {
            console.log('setValidationErrors', action);
            state.validationErrors = action.payload;
        },
        resetError: () => {
            console.log('resetError');
            return initialState;
        }
    }
});

export const {
    setError,
    resetError,
    setValidationErrors,
} = errorSlice.actions;

export const selectValidationErrors = (state: any) => state.error.validationErrors;

export default errorSlice.reducer;
