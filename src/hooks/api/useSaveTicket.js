import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketTypesApi from '../../services/ticketTypesApi';

export default function useSaveTicket() {
  const token = useToken();

  const {
    data: ticketSaved,
    loading: saveTicketLoading,
    error: saveTicketError,
    act: saveTicket
  } = useAsync((data) => ticketTypesApi.saveTicket(data, token));
  return {
    ticketSaved,
    saveTicketLoading,
    saveTicketError,
    saveTicket
  };
}
