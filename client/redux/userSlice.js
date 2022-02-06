// creating a user slice to hold the current logged in
// user's data.

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: null, //jwt token for api calls
	data: null, // store the user settings and other data
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
			state = initialState;
		},
		apiStart: (state) => {
			state.isLoading = true;
		},
	},
});

export const { updateData, updateError, updateToken, logout, apiStart } =
	userSlice.actions;
export default userSlice.reducer;
