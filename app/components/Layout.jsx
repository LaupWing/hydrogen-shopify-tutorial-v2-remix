import { useEffect } from "react"
import { Drawer, useDrawer } from "./Drawer"

export const Layout = ({ children, title}) => {
   const { closeDrawer, isOpen, openDrawer } = useDrawer()

   useEffect(() => {
      openDrawer()
   }, [])

   return (
      <div className="flex flex-col min-h-screen antialiased bg-neutral-50">
         <header
            role={"banner"}
            className={`flex items-center h-16 p-6 md:p-8 lg:p-12 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm`}
         >
            <div className="flex gap-12">
               <a href="/" className="font-bold">
                  { title }
               </a>
            </div>
         </header>

         <main 
            role={"main"} 
            id="mainContent"
            className="flex-grow p-6 md:p-8 lg:p-12"
         >
            { children }
         </main>
         <Drawer 
            open={isOpen} 
            onClose={closeDrawer}
         >
            <h2>TODO Cart Data</h2>
         </Drawer>
      </div>
   )
}
