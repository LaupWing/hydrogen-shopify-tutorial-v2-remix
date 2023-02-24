import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

export const Drawer = ({ open, onClose, children }) => {
   return (
      <Transition appear show={open} as={Fragment}>
         <Dialog as="div" className={"relative z-50"} onClose={onClose}>
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0 left-0"
               enterTo="opacity-100"
               leave="eaes-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
         </Dialog>
      </Transition>
   )
}

function IconClose() {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 20 20"
         className="w-5 h-5"
      >
         <title>Close</title>
         <line
            x1="4.44194"
            y1="4.30806"
            x2="15.7556"
            y2="15.6218"
            stroke="currentColor"
            strokeWidth="1.25"
         />
         <line
            y1="-0.625"
            x2="16"
            y2="-0.625"
            transform="matrix(-0.707107 0.707107 0.707107 0.707107 16 4.75)"
            stroke="currentColor"
            strokeWidth="1.25"
         />
      </svg>
   )
}
