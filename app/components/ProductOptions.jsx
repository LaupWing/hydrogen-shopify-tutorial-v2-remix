import { Link, useLocation } from "@remix-run/react"

const ProductOptions = ({ options }) => {
   const {pathname, search} = useLocation()

   return (
      <div className="grid gap-4 mb-6">
         {options.map(option => {
            if(!option.values.length){
               return
            }
            return (
               <div
                  key={option.name}
                  className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
               >
                  <h3 className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
                     {option.name}
                  </h3>

                  <div className="flex flex-wrap items-baseline gap-4">
                     {option.values.map((value) => {
                        const linkParams = new URLSearchParams(search)
                        linkParams.set(option.name, value)

                        return (
                           <Link
                              key={value}
                              to={`${pathname}?${linkParams.toString()}`}
                              preventScrollReset
                              replace
                              className="leading-none py-1 border-b-[1.5px] cursor-pointer transition-all duration-200"
                           >
                              {value}
                           </Link>
                        )
                     })}
                  </div>
               </div>
            )
         })}
      </div>
   )
}
export default ProductOptions