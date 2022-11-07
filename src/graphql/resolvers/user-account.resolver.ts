import { GraphQLYogaError } from '@graphql-yoga/node';
import sharp from 'sharp';
import { serialize } from 'cookie';

import type { NextApiResponse } from 'next';
import type { AuthCredentials } from '@/types/auth.type';
import type { FormData } from '@/components/user-account/user-info-form.component';
import { UserAvatar } from '@/types/user-account.type';

const stockUserAvatars = [
  {
    id: 1,
    imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/avatar-1.png`,
  },
  {
    id: 2,
    imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/avatar-2.png`,
  },
  {
    id: 3,
    imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/avatar-3.png`,
  },
  {
    id: 4,
    imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/avatar-4.png`,
  },
  {
    id: 5,
    imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/avatar-5.png`,
  },
];

const STORAGE_NAME = 'new-game-bucket';
const USER_AVATAR_PATH = 'user-avatar/';

const getUserAccountByUserId = async (supabase: any, user: any) => {
  const { data, error } = await supabase
    .from('user_account')
    .select()
    .is('is_active', true)
    .eq('user_id', user.id);

  if (error || !data.length) {
    return { userId: user.id, email: user.email };
  }

  const {
    id,
    user_id,
    display_name,
    full_name,
    avatar_type,
    avatar_image_url,
    is_active,
    created_at,
  } = data[0];

  return {
    id: id,
    userId: user_id,
    email: user.email,
    displayName: display_name,
    fullName: full_name,
    avatarType: avatar_type,
    avatarImageUrl: avatar_image_url,
    isActive: is_active,
    createdAt: created_at,
  };
};

const addAuthCookie = (res: NextApiResponse, token: string) => {
  // Set cookie
  res.setHeader(
    'Set-Cookie',
    serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict',
      path: '/',
    })
  );
};

const getCurrentUser = async (supabase: any, token: string) => {
  if (!token) {
    return null;
  }

  const {
    data: { user },
    authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    throw new GraphQLYogaError(authError.message || 'Invalid token');
  }

  return getUserAccountByUserId(supabase, user);
};

const getUserAvatars = (filter: any): UserAvatar[] => {
  const { ids } = filter || {};

  if (!ids || !ids.length) {
    return stockUserAvatars;
  }

  return stockUserAvatars.filter(
    (avatar) => !!ids.find((id: number) => id === avatar.id)
  );
};

const userAvatars = (
  _parent: any,
  { filter }: any,
  _context: any,
  _info: any
) => getUserAvatars(filter);

const currentUser = (
  _parent: any,
  { token }: { token: string },
  { supabase }: any,
  _info: any
) => getCurrentUser(supabase, token);

const login = async (
  _parent: any,
  { email, password }: AuthCredentials,
  { supabase, res }: any,
  _info: any
) => {
  const {
    data: { session, user },
    authError,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    throw new GraphQLYogaError(authError.message);
  }

  addAuthCookie(res, session.access_token);
  return getUserAccountByUserId(supabase, user);
};

const register = async (
  _parent: any,
  { email, password }: AuthCredentials,
  { supabase }: any,
  _info: any
) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    throw new GraphQLYogaError(error.message);
  }

  return { userId: user.id, email: user.email };
};

const upsertUserAccount = async (
  _parent: any,
  {
    data: { avatarType, avatarImage, userId, displayName, fullName },
  }: { data: FormData & { userId: string } },
  { supabase }: any,
  _info: any
) => {
  let avatar_image_url = null;
  if (avatarType === 0) {
    const buffer = Buffer.from(avatarImage.data_url.split(',')[1], 'base64');
    const resizedImg = await sharp(buffer)
      .resize(300, 300)
      .png({ quality: 80 })
      .toBuffer();

    const { error } = await supabase.storage
      .from(STORAGE_NAME)
      .upload(USER_AVATAR_PATH + userId + '.png', resizedImg, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new GraphQLYogaError(error.message);
    }

    const { data: image } = supabase.storage
      .from(STORAGE_NAME)
      .getPublicUrl(USER_AVATAR_PATH + userId + '.png');

    if (image) {
      avatar_image_url = image?.publicURL;
    }
  }

  const { data: existingData } = await supabase
    .from('user_account')
    .select('id')
    .eq('user_id', userId);

  const { data, error } = await supabase
    .from('user_account')
    .upsert({
      ...(existingData?.length && { id: existingData[0].id }),
      avatar_type: avatarType,
      avatar_image_url,
      user_id: userId,
      display_name: displayName,
      full_name: fullName,
    })
    .select();

  if (error) {
    throw new GraphQLYogaError(error.message);
  }

  return {
    id: data.id,
    userId: data.user_id,
    email: data.email,
    displayName: data.display_name,
    fullName: data.full_name,
    avatarType: data.avatar_type,
    avatarImageUrl: data.avatar_image_url,
    isActive: data.is_active,
    createdAt: data.created_at,
  };
};

export { userAvatars, currentUser, login, register, upsertUserAccount };
