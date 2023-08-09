import styled from 'styled-components';
import useSignInWithGit from '../../hooks/api/useSignInWithGit';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../contexts/UserContext';

export default function SignInWithGitHubButton() {
  const { loadingSignInWithGit, signInWithGit } = useSignInWithGit();
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  function redirectToGitHub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const CLIENT_ID = 'd1d477f7e6af7bc288f8';
    const params = new URLSearchParams({
      response_type: 'code',
      scope: 'user',
      client_id: CLIENT_ID,
      redirect_uri: 'http://localhost:3000/sign-in',
    });
  
    const authURL = `${GITHUB_URL}?${params.toString()}`;
    window.location.href = authURL;
  }

  useEffect(async() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    if (code) {
      try {
        const userData = await signInWithGit(code);
        setUserData(userData);
        toast('Login realizado com sucesso!');
        navigate('/dashboard');
      } catch (err) {
        toast('Não foi possível fazer o login!');
      }
    }
  }, []);

  return (
    <GitHubButton onClick={redirectToGitHub} disabled={loadingSignInWithGit}><img src="https://customer.elephantsql.com/img/github.svg" />Entrar com GitHub</GitHubButton>
  );
}

const GitHubButton = styled.button`
  width:340px;
  height: 56px;
  border: 1px solid #CECECE;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: #ffffff;
  img{
    width:20px;
    height: 20px;
    margin-bottom: 5px;
  }
  display:flex;
  align-items: center;
  justify-content: center;
  gap:10px;
  font-size: 16px;
  font-weight: 700;
  cursor:pointer;
`;
