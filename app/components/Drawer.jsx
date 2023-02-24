import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

export const Drawer = ({open, onClose, children}) => {
   return (
      <Transition 
         appear 
         show={open} 
         as={Fragment}
      >
         <Dialog
            as="div"
            className={"relative z-50"}
            onClose={onClose}
         >
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0 left-0"
               enterTo="opacity-100"
               leave="eaes-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-black bg-opacity-25"/>
            </Transition.Child>
         </Dialog>
      </Transition>
   )
}
