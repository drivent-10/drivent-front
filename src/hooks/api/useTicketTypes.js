import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketTypesApi from '../../services/ticketTypesApi';

export default function useTicketTypes() {
  const token = useToken();

  const {
    data: ticketTypes,
    loading: ticketTypesLoading,
    error: ticketTypesError,
    act: getTicketTypes
  } = useAsync(() => ticketTypesApi.getTicketTypes(token));

  return {
    ticketTypesLoading,
    ticketTypesError,
    ticketTypes,
    getTicketTypes
  };
}
