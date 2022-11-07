import { useState } from 'react';
import { toast } from 'react-toastify';

import { gqlFetcher } from '@/utils/gql-fetcher.util';
import type { RegisterFormData } from '@/components/user-account/user-register-form.component';
import type { UserInfoFormData } from '@/components/user-account/user-info-form.component';

type UserAccountFormData = UserInfoFormData & { userId: string };

type Result = {
  loading: boolean;
  isRegisterComplete: boolean;
  isAdditionalInfoComplete: boolean;
  register: (registerData: RegisterFormData) => any;
  upsertUserAccount: (userAccountData: UserAccountFormData) => any;
};

const registerMutation = `
  mutation RegisterMutation($email: String, $password: String) {
    register(email: $email, password: $password) {
      userId
      email
    }
  }
`;

const upsertUserAccountMutation = `
  mutation UpsertUserAccountMutation($data: UserAccountUpsertInput) {
    upsertUserAccount(data: $data) {
      displayName
      fullName
    }
  }
`;

export const useRegister = (): Result => {
  const [loading, setLoading] = useState(false);
  const [isRegisterComplete, setIsRegisterComplete] = useState(false);
  const [isAdditionalInfoComplete, setIsAdditionalInfoComplete] =
    useState(false);

  const register = async (registerData: RegisterFormData) => {
    try {
      setLoading(true);
      const { email, password } = registerData;
      const data = await gqlFetcher(registerMutation, { email, password });
      setLoading(false);
      setIsRegisterComplete(true);
      return data;
    } catch (error) {
      setLoading(false);
      setIsRegisterComplete(false);
      toast.error(`We've encountered a problem, please try again.`);
    }
  };

  const upsertUserAccount = async (userAccountData: UserAccountFormData) => {
    const avatarImage = !!userAccountData.avatarImage
      ? userAccountData.avatarImage[0]
      : undefined;

    try {
      setLoading(true);
      const data = await gqlFetcher(upsertUserAccountMutation, {
        data: { ...userAccountData, avatarImage },
      });
      setLoading(false);
      setIsAdditionalInfoComplete(true);
      return data;
    } catch (error) {
      setLoading(false);
      setIsAdditionalInfoComplete(false);
      toast.error(`We've encountered a problem, please try again.`);
    }
  };

  return {
    loading,
    isRegisterComplete,
    isAdditionalInfoComplete,
    register,
    upsertUserAccount,
  };
};
