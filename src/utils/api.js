import axios from 'axios';

/// GLOBAL FUNCTION THAT MANAGES HTTP REQUESTS, TARGET URL CHANGES BASED ON ENVIROMENT VARIABLE

export const BASE_URL_API =
	process.env.NODE_ENV === 'production'
		? 'https://fantasyfootballsquadbuilder.onrender.com'
		: 'http://localhost:8080';
export const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://fantasquadbuilder.onrender.com'
		: 'http://localhost:3000';

const apiCall = (method, path, data) => {
	if (data)
		return axios[method](BASE_URL_API + path, data, { withCredentials: true });
	else return axios[method](BASE_URL_API + path, { withCredentials: true });
};

export default apiCall;
