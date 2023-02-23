import { Link } from "@remix-run/react"

export async function action({request, context}){
   const {session, storefront} = context
   const headers = new Headers()

   const [formData, storedCartId, customerAccessToken] = await Promise.all([
      request.formData(),
      session.get("cartId"),
      session.get("customerAccessToken")
   ])
   let cartId = storedCartId

   let status = 200
   let result
}

const Cart = () => {
   return (
      <div className="flex flex-col space-y-7 justify-center items-center md:py-8 md:px-12 px-4 py-6 h-screen">
         <h2 className="whitespace-pre-wrap max-w-prose font-bold text-4xl">
            Your cart is empty
         </h2>
         <Link
            to={"/"}
            className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none bg-black text-white w-full"
         >
            Continue Shopping
         </Link>
      </div>
   )
}
export default Cart

export async function cartCreate({input, storefront}){
   const {cartCreate} = await storefront.mutate
   storefront.mutate(CREATE_CART_MUTATION, {
      variables: {
         input
      }
   })

   return cartCreate
}



const USER_ERROR_FRAGMENT = `#graphql
   fragment ErrorFragment on CartUserError {
      message
      field
      code
   }
`

const LINES_CART_FRAGMENT = `#graphql
   fragment CartLinesFragment on Cart {
      id
      totalQuantity
   }
`

const CREATE_CART_MUTATION = `#graphql
   mutation($input: CartInput!, $country: CountryCode = ZZ, $language: LanguageCode)
   @inContext(country: $country, language: $language){
      cartCreate(input: $input) {
         cart {
            ...CartLinesFragment
         }
         errors: userErrors {
            ...ErrorFragment
         }
      }
   }
   ${LINES_CART_FRAGMENT}
   ${USER_ERROR_FRAGMENT}
`

const ADD_LINES_MUTATION = `#graphql
   mutation ($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode = ZZ, $language: LanguageCode) @inContext(country: $country, language: $language){
      cartLinesAdd(cartId: $cartId, lines: $lines){
         cart {
            ...CartLinesFragment
         }
         errors: userErrors {
            ...ErrorFragment
         }
      }
   }
   ${LINES_CART_FRAGMENT}
   ${USER_ERROR_FRAGMENT}
`

const REMOVE_LINE_ITEMS_MUTATION = `#graphql
   mutation ($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode, $country: CountryCode) @inContext(country: $country, language: $language) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds){
         cart {
            id
            totalQuantity
            lines(first: 100){
               edges {
                  node {
                     id
                     quantity
                     merchandise {
                        ...on ProductVariant {
                           id
                        }
                     }
                  }
               }
            }
         }
         errors: userErrors {
            message
            field
            code
         }
      }
   }
`