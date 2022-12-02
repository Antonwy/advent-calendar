import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CalendarDay } from '../firebase/calendar_day';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalProps<T> = {
  closeModal: (res?: T) => void;
  isOpen: boolean;
  day: CalendarDay;
};

export default function CalendarDayModal<T>({
  closeModal,
  isOpen,
  day,
}: ModalProps<T>) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-light bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-screen items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg h-3/4 max-h-screen transform overflow-clip rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                  <Image
                    src={day.imageUrl}
                    alt="Calendar Day Image"
                    fill={true}
                    className="object-cover"
                  />
                  <div className="absolute right-8 top-8">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-white p-2 text-black hover:scale-105 transition-all outline-none ease-in-out"
                      onClick={() => closeModal()}
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
