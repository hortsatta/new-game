import NextLink from 'next/link';
import { Button, CSS, Grid, Link, Loading, styled } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseInput, BaseInputPassword } from '@/components/base';
import type { AuthCredentials } from '@/types/auth.type';

type Props = {
  onSubmit: (data: AuthCredentials) => any;
  loading?: boolean;
  css?: CSS;
};

const Form = styled('form', { w: '360px' });
const gridCss = { w: '100%' };

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const UserLoginForm = ({ loading, onSubmit, ...moreProps }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...moreProps} onSubmit={handleSubmit(onSubmit)}>
      <Grid.Container
        css={{ px: 0 }}
        direction='column'
        gap={4}
        alignItems='center'
      >
        <Grid css={gridCss}>
          <BaseInput
            labelPlaceholder='Email'
            status={errors?.email ? 'error' : 'default'}
            fullWidth
            {...(errors?.email && {
              helperText: errors.email.message,
              helperColor: 'error',
            })}
            {...register('email')}
          />
        </Grid>
        <Grid css={gridCss}>
          <BaseInputPassword
            labelPlaceholder='Password'
            status={errors?.password ? 'error' : 'default'}
            fullWidth
            {...register('password')}
          />
        </Grid>
        <Grid css={gridCss}>
          <Button
            aria-label='sign up'
            css={{ w: '100%' }}
            color='primary'
            size='lg'
            type='submit'
            disabled={loading}
            auto
            shadow
          >
            {loading ? (
              <Loading type='points' color='currentColor' size='sm' />
            ) : (
              'Log In'
            )}
          </Button>
          <NextLink href='/register' passHref>
            <Link
              aria-label='log in'
              css={{
                w: '100%',
                d: 'inline-block',
                mt: '$8',
                maxW: '100%',
                textAlign: 'center',
                fontSize: '14px',
                color: '$primary',
              }}
            >
              I don&apos;t have an account, I want to register.
            </Link>
          </NextLink>
        </Grid>
      </Grid.Container>
    </Form>
  );
};

export default UserLoginForm;
