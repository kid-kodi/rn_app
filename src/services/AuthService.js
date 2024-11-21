import {showError} from '../helpers/Utils';
import api from '../networks/api';
import {BASE_API_URL} from '@env';

// register
export async function createUser(user_map) {
  try {
    const response = await api.post('/api/auth/register', user_map);
    return response.data;
  } catch (error) {
    showError(error.message);
  }
}

// activate
export async function activateAccount(otp_map) {
  try {
    const response = await api.post('/api/auth/activation', otp_map);
    return response.data;
  } catch (error) {
    showError(error.message);
  }
}

// update
export async function updateUser(user_map) {
  try {
    const response = await api.put('/api/auth/me', user_map);
    return response.data;
  } catch (error) {
    showError(error.message);
  }
}

export async function uploadFile(formData) {
  try {
    const response = await api.post('/upload-endpoint', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the required content type
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
