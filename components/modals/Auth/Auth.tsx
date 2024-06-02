'use client';

import { ChevronRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import ModalOverlay from '../Overlay';
import { signIn } from 'next-auth/react';

interface Props {
  isOpen: boolean;
  login?: boolean;
  closeModal: () => void;
}

const AuthenticationModal = ({ isOpen, closeModal, login }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  // close modal when user clicks outside container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSignin = () => {
    signIn('github');
  };

  return isMounted
    ? createPortal(
        <ModalOverlay>
          <div
            className='bg-[#050000] border-[1px] border-gray-900 w-[85%] p-6 py-10 rounded-custom flex flex-col items-center justify-between h-auto shadow-interview-modal md:w-[360px] md:min-h-[320px]'
            ref={modalRef}
          >
            <div className='w-[95%] flex justify-end mb-8' onClick={closeModal}>
              <X
                size={21}
                strokeWidth={2}
                className='cursor-pointer text-white'
              />
            </div>
            <div className='mb-2'>
              <Image src='/icon.png' alt='Icon' height={65} width={65} />
            </div>

            <div className='py-4 flex flex-col items-center w-full'>
              <h2 className='text-[1.5rem] text-gray-300 font-semibold'>
                Continue to Account
              </h2>

              <p className='text-sm font-medium py-2 text-gray-200'>
                Sign in with your Github
              </p>
            </div>

            <button
              className='flex items-center justify-center rounded-custom gap-2 p-3 w-full bg-red-800 active:bg-red-900 hover:bg-red-900 mt-4'
              onClick={handleSignin}
            >
              <p className='text-base font-semibold md:text-sm text-white'>
                Continue with Github
              </p>
              <ChevronRight className='text-white' size={22} />
            </button>
          </div>
        </ModalOverlay>,
        document.body
      )
    : null;
};

export default AuthenticationModal;
