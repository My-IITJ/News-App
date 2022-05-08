// creating a user slice to hold the current logged in
// user's data.

import { createSlice } from '@reduxjs/toolkit';
import { lightTheme, darkTheme } from '../constants';

const initialState = {
	token: null, //jwt token for api calls
	data: null, // store the user settings and other data
	theme: lightTheme,
	error: null, // if any api error
	isLoading: false, // whether im fetching data or not
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateToken: (state, action) => {
			state.token = action.payload.token;
			state.isLoading = false;
			state.error = null;
		},
		updateData: (state, action) => {
			const data = state.data
				? { ...state.data, ...action.payload.data }
				: action.payload.data;

			state.data = data;
			state.isLoading = false;
			state.error = null;
		},
		updateError: (state, action) => {
			state.error = action.payload.error;
			state.isLoading = false;
		},
		logout: (state) => {
			state.data = null;
		},
		apiStart: (state) => {
			state.isLoading = true;
		},
		toggleTheme: (state, action) => {
			state.theme = action.payload.type === 'dark' ? darkTheme : lightTheme;
		},
		authUser: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const {
	updateData,
	updateError,
	updateToken,
	logout,
	apiStart,
	toggleTheme,
	authUser,
} = userSlice.actions;
export default userSlice.reducer;
