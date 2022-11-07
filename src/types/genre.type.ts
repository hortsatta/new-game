import type { AuditTrail } from './base.type';

export type Genre = AuditTrail & {
  id: number;
  name: string;
  slug: string;
  rawgSlug: string;
};
