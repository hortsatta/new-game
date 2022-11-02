export const carouselTypeDef = `
  enum CarouselSortField {
    created_at
  }

  type CarouselImage {
    url: String
    name: String
  }  

  type CarouselGameProduct implements IGameProduct & Node & AuditTrail {
    id: ID!
    games: [Game]
    discount: Float
    price: Float
    finalPrice: Float
    isActive: Boolean
    createdAt: String
    imageUrl: String
  }  

  type CarouselContent {
    type: String!
    image: CarouselImage
    gameProduct: CarouselGameProduct
    excerpt: String
  }

  type Carousel implements Node & AuditTrail {
    id: ID!
    content: CarouselContent
    isActive: Boolean
    createdAt: String
  }

  input CarouselFilterInput {
    limit: Int
  }

  input CarouselSortInput {
    field: CarouselSortField
    order: Sort
  }
`;
