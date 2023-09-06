import axios from 'axios';
const BASE_URL = 'https://fantasyfootballsquadbuilder.onrender.com';
//const BASE_URL = 'http://localhost:8080';

const apiCall = (method, path, data) => {
	if (data)
		return axios[method](BASE_URL + path, data, { withCredentials: true });
	else return axios[method](BASE_URL + path, { withCredentials: true });
};

export default apiCall;
