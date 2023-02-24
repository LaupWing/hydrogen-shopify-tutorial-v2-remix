import {
   Links,
   Meta,
   Outlet,
   Scripts,
   ScrollRestoration,
   useLoaderData,
} from "@remix-run/react"
import styles from "./styles/app.css"
import favicon from "../public/favicon.svg"
import { Layout } from "./components/Layout"
import { Seo } from "@shopify/hydrogen"
import { ShopifyProvider } from "@shopify/hydrogen-react"
import { CART_QUERY } from "./queries/cart"

export const links = () => {
   return [
      { rel: "stylesheet", href: styles },
      {
         rel: "preconnect",
         href: "https://cdn.shopify.com",
      },
      {
         rel: "preconnect",
         href: "https://shop.app",
      },
      { rel: "icon", type: "image/svg+xml", href: favicon },
   ]
}

const shopifyConfig = {
   storefrontToken: "3b580e70970c4528da70c98e097c2fa0",
   storeDomain: "https://hydrogen-preview.myshopify.com",
   storefrontApiVersion: "2023-01",
   countryIsoCode: "US",
   languageIsoCode: "en",
}

export const meta = () => ({
   charset: "utf-8",
   viewport: "width=device-width,initial-scale=1",
})

export async function loader({ context }) {
   const layout = await context.storefront.query(LAYOUT_QUERY)
   return { layout }
}

export default function App() {
   const data = useLoaderData()

   const { name } = data.layout.shop

   return (
      <ShopifyProvider {...shopifyConfig}>
         <html lang="en">
            <head>
               <Seo />
               <Meta />
               <Links />
            </head>
            <body>
               <Layout title={name}>
                  <Outlet />
               </Layout>
               <ScrollRestoration />
               <Scripts />
            </body>
         </html>
      </ShopifyProvider>
   )
}

async function getCart({storefront}, cartId) {
   if(!storefront){
      throw new Error("Missing storefront client in cart query")
   }
   const { cart } = await storefront.query(CART_QUERY, {
      variables: {
         cartId,
         country: storefront.i18n.country,
         language: storefront.i18n.language
      },
      cache: storefront.CacheNone()
   })

   return cart
}

const LAYOUT_QUERY = `#graphql
   query layout {
      shop {
         name
         description
      }
   }
`
