import axios from "axios";

// Handles API requests to server
export const requestAPI = async (requestType, url, payload = null) => {
  try {
    const apiOptions = {
      method: requestType,
      url,
      data: payload,
    };
    const response = await axios(apiOptions);
    return response;
  } catch (error) {
    console.error(`Error with ${requestType} request to ${url}:`, error);
    throw error;
  }
};
