// when calling api's in react native...we cannot use localhost
// so use your local ip address
const BASE_URL_DEV = 'http://192.168.0.102:8080/api';
const BASE_URL_PROD = 'https://api-my-iitj.vercel.app/api';
export const BASE_URL_AUTH = 'http://192.168.0.102:8080/auth'
export const appUrl = BASE_URL_DEV; //'http://172.30.13.123:8080/api';
export const defaultImgUrl =
	'https://res.cloudinary.com/myiitj/image/upload/v1652015359/icon_qhwzl2.png';

export const ROLES = {
	GUEST: 'guest',
	STUDENT: 'student',
	FACULTY: 'faculty',
};

// read the emails.json file

export const getUserRole = (email) => {
	const emails = require("../assets/emails.json");
	// print type of emails
	if (emails.includes(email)) {
		return ROLES.FACULTY;
	}else if (email.includes("@iitj.ac.in")) {
		return ROLES.STUDENT;
	} else {
		return ROLES.GUEST;
	}
};
