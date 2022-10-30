import { supabase } from '@/utils/supabase-client.util';
import { GraphQLYogaError } from '@graphql-yoga/node';
import sharp from 'sharp';

import type { AuthCredentials } from '@/types/auth.type';
import type { FormData } from '@/components/user-account/user-info-form.component';

const stockUserAvatars = [
  {
    id: 1,
    imageUrl:
      'https://lsyyjunsfwfhanzmlkrt.supabase.co/storage/v1/object/public/new-game-bucket/avatar-1.png',
  },
  {
    id: 2,
    imageUrl:
      'https://lsyyjunsfwfhanzmlkrt.supabase.co/storage/v1/object/public/new-game-bucket/avatar-2.png',
  },
  {
    id: 3,
    imageUrl:
      'https://lsyyjunsfwfhanzmlkrt.supabase.co/storage/v1/object/public/new-game-bucket/avatar-3.png',
  },
  {
    id: 4,
    imageUrl:
      'https://lsyyjunsfwfhanzmlkrt.supabase.co/storage/v1/object/public/new-game-bucket/avatar-4.png',
  },
  {
    id: 5,
    imageUrl:
      'https://lsyyjunsfwfhanzmlkrt.supabase.co/storage/v1/object/public/new-game-bucket/avatar-5.png',
  },
];

const STORAGE_NAME = 'new-game-bucket';
const USER_AVATAR_PATH = 'user-avatar/';

const userAvatars = (
  _parent: any,
  { filter }: any,
  _context: any,
  _info: any
) => {
  const { ids } = filter || {};

  if (!ids || !ids.length) {
    return stockUserAvatars;
  }

  return stockUserAvatars.filter(
    (avatar) => !!ids.find((id: number) => id === avatar.id)
  );
};

const userAccounts = (_parent: any, _args: any, _context: any, _info: any) => {
  return { id: 1, name: 'John Smith', status: 'cached' };
};

const register = async (
  _parent: any,
  { email, password }: AuthCredentials,
  _context: any,
  _info: any
) => {
  const { data: user, error } = await supabase.auth.api.createUser({
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
  _context: any,
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

  const { data: existingData } = await _context.supabase
    .from('user_account')
    .select('id')
    .eq('user_id', userId);

  const { data, error } = await _context.supabase
    .from('user_account')
    .upsert({
      ...(existingData.length && { id: existingData[0].id }),
      avatar_type: avatarType,
      avatar_image_url,
      user_id: userId,
      display_name: displayName,
      full_name: fullName,
    })
    .select();

  if (error) {
    console.log(error);
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

export { userAvatars, userAccounts, register, upsertUserAccount };
