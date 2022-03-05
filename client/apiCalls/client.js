import axios from 'axios';

// when calling api's in react native...we cannot use localhost
// so use your local ip address
export const appUrl = 'http://172.30.3.147:8080/api';

const client = axios.create({ baseUrl: appUrl });

export default client;
