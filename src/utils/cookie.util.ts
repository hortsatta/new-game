import { serialize } from 'cookie';
import type { NextApiResponse } from 'next';

export const removeAuthCookie = (res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })
  );
};
