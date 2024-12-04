import axios from 'axios';

/// GLOBAL FUNCTION THAT MANAGES HTTP REQUESTS, TARGET URL CHANGES BASED ON ENVIRONMENT VARIABLE

export const BASE_URL_API =
	process.env.NODE_ENV === 'production'
		? 'https://fantasystockbuilder.onrender.com' // Update to your stock app's production URL
		: 'http://localhost:5000'; // Ensure this matches your backend development server

export const BASE_URL =
	process.env.NODE_ENV === 'production'
		? 'https://fantasystockbuilder-client.onrender.com' // Update to your frontend production URL
		: 'http://localhost:3000';

const apiCall = async (method, path, data = null) => {
	const fullUrl = BASE_URL_API + path;

	try {
		// Log the request details
		console.log(`[API CALL]: ${method.toUpperCase()} ${fullUrl}`);
		if (data) console.log(`[REQUEST DATA]:`, data);

		const response = await axios[method](fullUrl, data, { withCredentials: true });

		// Log the response
		console.log(`[API RESPONSE]:`, response.data);

		return response;
	} catch (error) {
		// Log the error details
		if (error.response) {
			console.error(`[API ERROR]: ${error.response.status} - ${error.response.data.message}`);
		} else {
			console.error(`[API ERROR]:`, error.message);
		}
		throw error;
	}
};

export default apiCall;
