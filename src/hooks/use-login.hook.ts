import { useState } from 'react';
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
      displayName
      fullName
    }
  }
`;

export const useLogin = (): Result => {
  const [loading, setLoading] = useState(false);

  const login = async (credentials: AuthCredentials) => {
    try {
      setLoading(true);
      const { login } = await gqlFetcher(mutation, { ...credentials });
      setLoading(false);
      return login;
    } catch (error) {
      setLoading(false);
      toast.error('Email or password is incorrect, please try again.');
    }
  };

  return {
    loading,
    login,
  };
};
