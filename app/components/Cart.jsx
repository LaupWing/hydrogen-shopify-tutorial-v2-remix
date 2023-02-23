import { flattenConnection } from "@shopify/hydrogen"

export const CartLineItems = ({ linesObj }) => {
   const lines = flattenConnection(linesObj)

   return (
      <div className="space-y-8">
         {lines.map((line) => {
            return 
         })}
      </div>
   )
}

