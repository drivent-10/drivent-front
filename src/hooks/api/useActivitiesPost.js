import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivitiesPost() {
  const token = useToken();

  const {
    loading: postActivitiesLoading,
    error: postActivitiesError,
    act: postActivities
  } = useAsync((data) => activitiesApi.postActivitiesApi(data, token), false);

  return {
    postActivitiesLoading,
    postActivitiesError,
    postActivities
  };
}
