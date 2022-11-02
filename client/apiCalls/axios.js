import axios from 'axios';
import auth from '@react-native-firebase/auth';

axios.interceptors.request.use(
	async (config) => {
		const token = await auth().currentUser.getIdToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
   (err) => Promise.reject(err)
);

export default axios