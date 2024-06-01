'use client';

import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import ModalOverlay from '../Overlay';

interface Props {
  isOpen: boolean;
  signIn?: boolean;
  closeModal: () => void;
}

const AuthenticationModal = ({ isOpen, closeModal, signIn }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
  }, [isOpen, closeModal]);

  return isMounted
    ? createPortal(
        <ModalOverlay>
          <div
            ref={modalRef}
            className='bg-[#050000] border-[1px] border-gray-900 w-[85%] p-6 py-10 rounded-custom flex flex-col items-center justify-between h-auto shadow-interview-modal md:w-[360px] md:min-h-[320px]'
          >
            <div className='w-[95%] flex justify-end mb-8' onClick={closeModal}>
              <X size={21} strokeWidth={2} className='cursor-pointer' />
            </div>
            <div className='mb-2'>
              <Image src='/icon.png' alt='Icon' height={65} width={65} />
            </div>

            <div className='py-4 flex flex-col items-center w-full'>
              <h2 className='text-[1.5rem] text-gray-300 font-semibold'>
                {signIn ? 'Sign In' : 'Create Account'}
              </h2>

              {signIn ? (
                <p className='text-sm font-medium py-2 text-gray-200'>
                  New to Movie App?{' '}
                  <span className='text-gray-100 underline cursor-pointer hover:text-gray-100'>
                    Create an account
                  </span>
                </p>
              ) : (
                <p className='text-sm font-medium py-2 text-gray-200'>
                  Already have one?{' '}
                  <span className='text-gray-100 underline cursor-pointer hover:text-gray-100'>
                    Sign In
                  </span>
                </p>
              )}
            </div>

            <button className='flex items-center justify-center rounded-custom gap-3 p-3 w-full bg-red-800 active:bg-red-900 hover:bg-red-900 mt-8'>
              <Image
                src='/github.svg'
                alt='Github Icon'
                height={30}
                width={30}
              />
              <p className='text-base font-semibold md:text-sm'>
                {signIn ? 'Sign in' : 'Sign up'} with Github
              </p>
            </button>
          </div>
        </ModalOverlay>,
        document.body
      )
    : null;
};

export default AuthenticationModal;
