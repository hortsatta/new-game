import { useCallback } from 'react';
import { Image, Row, styled } from '@nextui-org/react';

import { useLogin } from '@/hooks/use-login.hook';
import { BaseScene } from '@/components/base';
import { UserLoginForm } from '@/components/user-account';

import type { NextPage } from 'next';
import type { AuthCredentials } from '@/types/auth.type';

const Center = styled('div', {
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
});

const LoginPage: NextPage = () => {
  const { loading, login } = useLogin();

  const handleLogin = useCallback(
    async (credentials: AuthCredentials) => {
      const user = await login(credentials);
    },
    [login]
  );

  return (
    <BaseScene>
      <Row css={{ pt: '$16', m: '0 auto', maxW: '1366px' }} justify='center'>
        <Center>
          <Image
            containerCss={{ pt: '$16', m: 0, maxW: 'auto', opacity: 0.7 }}
            width={500}
            objectFit='cover'
            src='/images/logo.svg'
            alt='new game logo'
          />
        </Center>
        <Center>
          <UserLoginForm loading={loading} onSubmit={handleLogin} />
        </Center>
      </Row>
    </BaseScene>
  );
};

export default LoginPage;
