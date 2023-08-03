import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketTypesApi from '../../services/ticketTypesApi';

export default function useSaveTicket() {
  const token = useToken();

  const {
    loading: saveTicketLoading,
    error: saveTicketError,
    act: saveTicket
  } = useAsync((data) => ticketTypesApi.saveTicket(data, token), false);

  return {
    saveTicketLoading,
    saveTicketError,
    saveTicket
  };
}
