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
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseInput } from '@/components/base';
import UserAvatarPicker from './user-avatar-picker.component';

import type { UserAvatar } from '@/types/user-account.type';

type Props = {
  userAvatars: UserAvatar[];
  onSubmit: (data: FormData) => any;
  loading?: boolean;
  css?: CSS;
};

export type FormData = {
  displayName: string;
  fullName: string;
  avatarType: number;
  avatarImage?: any;
};

const Form = styled('form', { w: '360px' });
const gridCss = { w: '100%' };

const schema = z
  .object({
    displayName: z
      .string()
      .min(3, 'Display name must be at least 3 characters long'),
    fullName: z.string().min(3, 'Name must be at least 3 characters long'),
    avatarType: z.number(),
    avatarImage: z.any().optional(),
  })
  .refine((data) => (data.avatarType === 0 ? !!data.avatarImage : true), {
    message: 'Please select an image',
    path: ['avatarImage'],
  });

const UserInfoForm = ({
  loading,
  userAvatars,
  onSubmit,
  ...moreProps
}: Props) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <Form {...moreProps} onSubmit={handleSubmit(onSubmit)}>
        <Grid.Container
          css={{ px: 0 }}
          direction='column'
          gap={4}
          alignItems='center'
        >
          <Grid css={gridCss}>
            <BaseInput
              labelPlaceholder='Display Name'
              status={errors?.displayName ? 'error' : 'default'}
              fullWidth
              {...(errors?.displayName && {
                helperText: errors.displayName.message,
                helperColor: 'error',
              })}
              {...register('displayName')}
            />
          </Grid>
          <Grid css={gridCss}>
            <BaseInput
              labelPlaceholder='Full Name'
              status={errors?.fullName ? 'error' : 'default'}
              fullWidth
              {...(errors?.fullName && {
                helperText: errors.fullName.message,
                helperColor: 'error',
              })}
              {...register('fullName')}
            />
          </Grid>
          <Grid css={gridCss}>
            <Text
              css={{
                mb: '$4',
                d: 'block',
                color: '$accents6',
                textAlign: 'center',
              }}
              span
            >
              Select Profile Avatar
            </Text>
            <Controller
              control={control}
              name='avatarType'
              render={({ field: { onChange, onBlur } }) => (
                <UserAvatarPicker
                  userAvatars={userAvatars}
                  onChange={(id) => onChange(id)}
                  onBlur={onBlur}
                />
              )}
            />
          </Grid>
          <Grid css={gridCss}>
            <Button
              aria-label='save info'
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
                'Save Info'
              )}
            </Button>
            <NextLink href='/' passHref>
              <Link
                aria-label='skip info'
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
                Skip, I&apos;ll update my profile later
              </Link>
            </NextLink>
          </Grid>
        </Grid.Container>
      </Form>
    </FormProvider>
  );
};

export default UserInfoForm;
