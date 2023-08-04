import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketTypesApi from '../../services/ticketTypesApi';

export default function useTicket() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicket
  } = useAsync(() => ticketTypesApi.getTicket(token));

  return {
    ticketLoading,
    ticketError,
    ticket,
    getTicket
  };
}
