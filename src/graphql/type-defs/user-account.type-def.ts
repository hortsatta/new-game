export const userAccountTypeDef = `
  type UserAccount implements AuditTrail {
    id: ID
    userId: ID
    email: String
    displayName: String
    fullName: String
    avatarType: Int
    avatarImageUrl: String
    isActive: Boolean
    createdAt: String
  }

  type UserAvatar implements Node {
    id: ID!
    imageUrl: String!
  }

  input UserAccountUpsertInput {
    userId: ID
    displayName: String!
    fullName: String!
    avatarType: Int!
    avatarImage: File
  }

  input UserAvatarFilterInput {
    limit: Int
    ids: [ID]
  }
`;
