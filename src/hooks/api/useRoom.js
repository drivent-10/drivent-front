import useAsync from '../useAsync';

import { getHotelApi } from '../../services/hotelApi';
import useToken from '../useToken';
import { getRoomApi } from '../../services/roomApi';

export default function useRoom() {
  const token = useToken();
  const {
    loading: roomLoading,
    error: roomError,
    act: getRoom
  } = useAsync((hotelId) => getRoomApi(token, hotelId), true);

  return {
    roomLoading,
    roomError,
    getRoom,
  };
}
