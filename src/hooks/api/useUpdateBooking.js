import useAsync from '../useAsync';
import useToken from '../useToken';
import * as bookingApi from '../../services/bookingApi';

export default function useUpdateBooking() {
  const token = useToken();

  const {
    loading: updateBookingLoading,
    error: updateBookingError,
    act: updateBooking
  } = useAsync((data) => bookingApi.updateBooking(data, token), false);

  return {
    updateBookingLoading,
    updateBookingError,
    updateBooking
  };
}
