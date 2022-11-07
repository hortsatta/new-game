export const cartTypeDef = `
  type CartItem {
    gameProduct: GameProduct
    quantity: Int
  }

  type Cart implements Node & AuditTrail {
    id: ID!
    userId: String
    paymentIntent: String
    cartItems: [CartItem]
    isActive: Boolean
    createdAt: String
  }
  
  input CartFilterInput {
    userId: String
    paymentIntent: String
  }
`;
