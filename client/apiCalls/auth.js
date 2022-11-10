import axios from './axios';
import { BASE_URL_AUTH } from './client';

// get user details with jwt token
export const updateUserData = async (data) => {
	const res = await axios.post(`${BASE_URL_AUTH}/user-details`, data);

	return res.data;
};
