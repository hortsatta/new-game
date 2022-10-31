import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import { gqlFetcher } from '@/utils/gql-fetcher.util';
import type { AuthCredentials } from '@/types/auth.type';

type Result = {
  loading: boolean;
  login: (credentials: AuthCredentials) => any;
};

const mutation = `
  mutation LoginMutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      userId
      email
    }
  }
`;

export const useLogin = (): Result => {
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials: AuthCredentials) => {
    try {
      setLoading(true);
      const data = await gqlFetcher(mutation, { ...credentials });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      toast.error(`We've encountered a problem, please try again.`);
    }
  }, []);

  return {
    loading,
    login,
  };
};
