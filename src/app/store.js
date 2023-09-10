import { configureStore } from '@reduxjs/toolkit';
import { alertReducer } from '../features/alert/alertSlice';
import { authReducer } from '../features/auth/authSlice';
import { articleReducer } from '../features/article/articleSlice';

export * from '../features/alert/alertSlice';
export * from '../features/auth/authSlice';
export * from '../features/article/articleSlice';
export * from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        articles: articleReducer
    },
});
