// when calling api's in react native...we cannot use localhost
// so use your local ip address
const BASE_URL_DEV = 'http://192.168.0.102:8080/api';
const BASE_URL_PROD = 'https://api-my-iitj.vercel.app/api';
export const appUrl = BASE_URL_PROD; //'http://172.30.13.123:8080/api';
export const authUrl = 'https://myiitj-api.vercel.app/auth'; //'http://172.30.13.123:8080/auth';
export const defaultImgUrl =
	'https://res.cloudinary.com/myiitj/image/upload/v1652015359/icon_qhwzl2.png';

export const ROLES = {
	GUEST: 'guest',
	STUDENT: 'student',
	FACULTY: 'faculty',
};

export const getUserRole = (email) => {
	if (email.includes('iitj.ac.in')) {
		const idx = email.search('iitj.ac.in');
		const name = email.substring(0, idx);

		return name.match(/\d+/g) ? ROLES.STUDENT : ROLES.FACULTY;
	} else {
		return ROLES.GUEST;
	}
};
