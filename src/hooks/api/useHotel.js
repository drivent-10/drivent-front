import useAsync from '../useAsync';

import { getHotelApi } from '../../services/hotelApi';
import useToken from '../useToken';

export default function useHotel() {
  const token = useToken();
  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: getHotel,
  } = useAsync(() => getHotelApi(token), true);

  return {
    hotel,
    hotelLoading,
    hotelError,
    getHotel
  };
}
