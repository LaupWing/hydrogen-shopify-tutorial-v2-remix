export const CART_QUERY = `#graphql
   query CartQuery($cartId: ID!){
      cart(id: $cartId) {
         ...CartFragment
      }
   }
   fragment CartFragment on Cart {
      id
      checkoutUrl
      totalQuantity
      buyerIdentity {
         countryCode
         customer {
            id
            email
            firstName
            lastName
            displayName
         }
         email
         phone
      }
      lines(first: 100){
         edges {
            node {
               id
               quantity
               attributes {
                  key
                  value
               }
               cost {
                  totalAmount {
                     amount
                     currencyCode
                  }
                  amountPerQuantity {
                     amount
                     currencyCode
                  }
                  compareAtAmountPerQuantity {
                     amount
                     currencyCode
                  }
               }
               merchandise {
                  ... on ProductVariant {
                     id
                     availableForSale
                     compareAtPrice {
                        ...MoneyFragment
                     }
                  }
               }
            }
         }
      }
   }

   fragment MoneyFragment on MoneyV2 {
      currencyCode
      amount
   }
`