export const genreTypeDef = `
  enum GenreSortField {
    name
    slug
  }

  type Genre implements Node & AuditTrail {
    id: ID!
    name: String
    slug: String
    rawgSlug: String
    isActive: Boolean
    createdAt: String
  }

  input GenreSortInput {
    field: GenreSortField
    order: Sort
  }
`;
