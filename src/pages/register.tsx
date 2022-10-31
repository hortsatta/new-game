import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Image, Row, styled, Text } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'phosphor-react';
import { toast } from 'react-toastify';

import { gqlFetcher } from '@/utils/gql-fetcher.util';
import { useRegister } from '@/hooks/use-register.hook';
import { BaseScene } from '@/components/base';
import { UserInfoForm, UserRegisterForm } from '@/components/user-account';

import type { NextPage } from 'next';
import type { FormData as RegisterFormData } from '@/components/user-account/user-register-form.component';
import type { FormData as UserInfoFormData } from '@/components/user-account/user-info-form.component';

const query = `
  query RegisterQuery {
    userAvatars {
      id
      imageUrl
    }
  }
`;

export const getStaticProps = async () => {
  try {
    const data = await gqlFetcher(query);
    return { props: { data } };
  } catch (error) {
    console.error(error);
  }
  return { props: { data: { userAvatars: [] } } };
};

const Center = styled('div', {
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
});

const RegisterPage: NextPage = ({ data: { userAvatars } }: any) => {
  const router = useRouter();
  const {
    isRegisterComplete,
    isAdditionalInfoComplete,
    loading,
    register,
    upsertUserAccount,
  } = useRegister();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleRegister = useCallback(
    async (data: RegisterFormData) => {
      const registeredUser = await register(data);
      setCurrentUser(registeredUser.register);
    },
    [register]
  );

  const handleUpsertUserAccount = useCallback(
    async (data: UserInfoFormData) => {
      await upsertUserAccount({ ...data, userId: currentUser.userId });
      toast.success('Registration completed. Redirecting...');
      router.push('/');
    },
    [currentUser, upsertUserAccount, router]
  );

  return (
    <BaseScene>
      {!isRegisterComplete && (
        <Row css={{ pt: '$16', m: '0 auto', maxW: '1366px' }} justify='center'>
          <Center css={{ pt: '$16' }}>
            <Image
              containerCss={{ m: 0, maxW: 'auto', opacity: 0.7 }}
              width={500}
              objectFit='cover'
              src='/images/logo.svg'
              alt='new game logo'
            />
          </Center>
          <Center>
            <UserRegisterForm loading={loading} onSubmit={handleRegister} />
          </Center>
        </Row>
      )}
      <AnimatePresence>
        {isRegisterComplete && !isAdditionalInfoComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Row
              css={{ m: '0 auto', pt: '$16', maxW: '1366px' }}
              justify='center'
              align='flex-start'
            >
              <Center
                css={{
                  pt: '$20',
                  pr: '$16',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Row css={{ w: 'fit-content' }} justify='center' align='center'>
                  <CheckCircle color='green' size={40} weight='bold' />
                  <Text css={{ ml: '$4' }} weight='medium' size='$3xl' span>
                    Account Created!
                  </Text>
                </Row>
                <Text>Add additional info, you can update this later.</Text>
              </Center>
              <Center css={{ pl: '$16', justifyContent: 'flex-start' }}>
                <UserInfoForm
                  loading={loading}
                  userAvatars={userAvatars}
                  onSubmit={handleUpsertUserAccount}
                />
              </Center>
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseScene>
  );
};

export default RegisterPage;
