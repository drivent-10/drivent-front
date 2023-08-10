import api from './api';

export async function getRoomApi(token, hotelId) {
  if (hotelId) {
    const response = await api.get(`/hotels/${hotelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  return;
}
