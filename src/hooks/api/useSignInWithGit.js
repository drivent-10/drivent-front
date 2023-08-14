import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignInWithGit() {
  const {
    loading: signInWithGitLoading,
    error: signInWithGitError,
    act: signInWithGit
  } = useAsync(authApi.signInWithGit, false);

  return {
    signInWithGitLoading,
    signInWithGitError,
    signInWithGit
  };
}
