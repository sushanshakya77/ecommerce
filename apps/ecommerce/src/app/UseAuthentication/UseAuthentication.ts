import { tokenStatus, authStatus } from './../Provider/AuthAtom';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const useAuthentication = () => {
  const [authState, setAuthState] = useRecoilState(authStatus);
  const [token, setToken] = useRecoilState(tokenStatus);

  const fetchAuthState = useCallback(() => {
    axios
      .post('/api/auth/refreshtoken')
      .then((response) => {
        console.log('this is response');
        console.log(response);
        setToken(response.data.accessToken);
        setAuthState('loggedIn');
      })
      .catch(() => setAuthState('loggedOut'));
  }, [setAuthState, setToken]);
  return { token, authState, setAuthState, fetchAuthState };
};
