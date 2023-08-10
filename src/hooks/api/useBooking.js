import useAsync from '../useAsync';

import * as bookingApi  from '../../services/bookingApi';
import useToken from '../useToken';

export default function useBooking() {
  const token = useToken();
  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: getBooking,
  } = useAsync(() => bookingApi.getBooking(token), true);

  return {
    booking,
    bookingLoading,
    bookingError,
    getBooking,
  };
}
