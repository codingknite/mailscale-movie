'use client';

interface Props {
  session: boolean;
}

import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AuthenticationModal from '../modals/Auth';
import { signOut, useSession } from 'next-auth/react';

const DesktopNav = ({ session }: Props) => {
  const path = usePathname();
  const router = useRouter();
  const { data: user, status } = useSession();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const isSearchPath = path === '/search' || path.startsWith('/search');
  const isMoviesPath = path === '/movies' || path.startsWith('/movies');

  const handleAuth = () => {
    if (session) {
      router.push('/favorites');
    } else {
      setOpenAuthModal(true);
    }
  };

  return (
    <div className='hidden md:flex md:items-center md:justify-between md:text-white md:glassmorphic-background md:py-2.5 md:px-8 md:fixed md:w-[100%]'>
      <div className='m-0 p-0 flex w-full justify-between'>
        <div className='flex items-center gap-2 ml-6'>
          <div onClick={() => router.push('/')} className='cursor-pointer'>
            <Image src='/icon.png' alt='Icon' height={35} width={35} />
          </div>
        </div>

        <div className='flex items-center gap-10 mr-6'>
          <div className='flex items-center gap-8 text-sm'>
            <Link
              href='/'
              className={`hover:font-semibold ${
                path === '/'
                  ? 'text-red-500 font-semibold hover:text-red-600'
                  : 'text-white font-medium hover:text-red-500'
              }`}
            >
              Home
            </Link>
            <Link
              href='/movies'
              className={`hover:font-semibold ${
                isMoviesPath
                  ? 'text-red-500 font-semibold hover:text-red-600'
                  : 'text-white font-medium hover:text-red-500'
              }`}
            >
              Movies
            </Link>
            <Link
              href='/search'
              className={`hover:font-semibold ${
                isSearchPath
                  ? 'text-red-500 font-semibold hover:text-red-600'
                  : 'text-white font-medium hover:text-red-500'
              }`}
            >
              Search
            </Link>
            <button
              className={`hover:font-semibold ${
                path === '/favorites'
                  ? 'text-red-500 font-semibold hover:text-red-600'
                  : 'text-white font-medium hover:text-red-500'
              }`}
              onClick={handleAuth}
            >
              Favorites
            </button>
          </div>

          {session && status === 'authenticated' ? (
            <div className='flex items-center gap-2 hover:text-red-500 hover:font-semibold cursor-pointer'>
              <Image
                src={user.user?.image as string}
                alt='Avatar'
                height={45}
                width={45}
                className='rounded-full'
              />
              <button
                className='text-sm font-medium'
                onClick={() => {
                  signOut();
                }}
              >
                Signout
              </button>
            </div>
          ) : (
            <div
              className='flex items-center gap-2 hover:text-red-500 hover:font-semibold cursor-pointer'
              onClick={handleAuth}
            >
              <User size={28} className='hover:text-red-500' />
              <p className='text-sm font-medium'>Login</p>
            </div>
          )}
        </div>
      </div>

      {openAuthModal ? (
        <AuthenticationModal
          isOpen={openAuthModal}
          closeModal={() => {
            setOpenAuthModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default DesktopNav;
