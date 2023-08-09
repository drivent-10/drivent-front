import useAsync from '../useAsync';

import useToken from '../useToken';
import { getActivitiesApi } from '../../services/activitiesApi';

export default function useActivities() {
  const token = useToken();
  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivities,
  } = useAsync(() => getActivitiesApi(token), true);

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivities,
  };
}
