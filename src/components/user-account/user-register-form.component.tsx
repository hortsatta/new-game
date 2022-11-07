import NextLink from 'next/link';
import {
  Button,
  CSS,
  Grid,
  Link,
  Loading,
  styled,
  Text,
} from '@nextui-org/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseInput, BaseInputPassword } from '@/components/base';
import type { AuthCredentials } from '@/types/auth.type';

type RegisterFormData = AuthCredentials & { confirmPassword: string };

type Props = {
  onSubmit: (data: RegisterFormData) => any;
  loading?: boolean;
  css?: CSS;
};

const Form = styled('form', { w: '360px' });
const gridCss = { w: '100%' };

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

const UserRegisterForm = ({ loading, onSubmit, ...moreProps }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
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
          <div>
            <BaseInputPassword
              labelPlaceholder='Confirm Password'
              status={errors?.confirmPassword ? 'error' : 'default'}
              fullWidth
              {...register('confirmPassword')}
            />
            <Text
              css={{
                d: 'block',
                mt: '$9',
                lineHeight: 2,
                opacity: 0.6,
              }}
              small
            >
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use.
            </Text>
          </div>
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
              'Register'
            )}
          </Button>
          <NextLink href='/login' passHref>
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
              I already have an account, I want to log in.
            </Link>
          </NextLink>
        </Grid>
      </Grid.Container>
    </Form>
  );
};

export { UserRegisterForm };
export type { RegisterFormData };
