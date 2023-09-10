import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWrapper } from '../../services';

const name = 'article';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

export const articleActions = { ...slice.actions, ...extraActions };
export const articleReducer = slice.reducer;

function createInitialState() {
    return {
        list: [],
        item: null
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;

    return {
        new: _new(),
        edit: edit(),
        delete: _delete(),
        getAll: getAll(),
        getById: getById(),
    };

    function _new() {
        return createAsyncThunk(
            `${name}/new`,
            async (data) => {
                await fetchWrapper.post(`${baseUrl}/${name}/new`, data);
            }
        );
    }

    function edit() {
        return createAsyncThunk(
            `${name}/edit`,
            async function ({ id, data }) {
                await fetchWrapper.put(`${baseUrl}/${name}/${id}`, data);
            }
        );
    }

    function _delete() {
        return createAsyncThunk(
            `${name}/delete`,
            async (id) => await fetchWrapper.delete(`${baseUrl}/${name}/${id}`)
        );
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(`${baseUrl}/`)
        );
    }

    function getById() {
        return createAsyncThunk(
            `${name}/getById`,
            async (id) => await fetchWrapper.get(`${baseUrl}/${name}/${id}`)
        );
    }
}

function createExtraReducers() {
    return (builder) => {
        getAll();
        getById();
        _delete();

        function getAll() {
            var { pending, fulfilled, rejected } = extraActions.getAll;
            builder
                .addCase(pending, (state) => {
                    state.list = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.list = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.list = { error: action.error };
                });
        }

        function getById() {
            var { pending, fulfilled, rejected } = extraActions.getById;
            builder
                .addCase(pending, (state) => {
                    state.item = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.item = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.item = { error: action.error };
                });
        }

        function _delete() {
            var { pending, fulfilled, rejected } = extraActions.delete;
            builder
                .addCase(pending, (state, action) => {
                    const article = state.list.value.find(x => x.id === action.meta.arg);
                    article.isDeleting = true;
                })
                .addCase(fulfilled, (state, action) => {
                    state.list.value = state.list.value.filter(x => x.id !== action.meta.arg);
                })
                .addCase(rejected, (state, action) => {
                    const article = state.list.value.find(x => x.id === action.meta.arg);
                    article.isDeleting = false;
                });
        }
    }
}

