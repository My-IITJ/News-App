import axios from './axios';
import { authUrl } from './client';

// get user details with jwt token
export const updateUserData = async (data) => {
	const res = await axios.post(`${authUrl}/user-details`, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return res.data;
};
