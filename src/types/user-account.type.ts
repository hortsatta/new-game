import type { AuditTrail } from './base.type';

type UserAccount = AuditTrail & {
  id: number;
  userId: string;
  email: string;
  displayName: string;
  fullName: string;
  avatarType: number;
  avatarImageUrl: string;
  isActive?: boolean;
  createdAt?: string;
};

type UserAvatar = {
  id: number;
  imageUrl: string;
};

export type { UserAccount, UserAvatar };
