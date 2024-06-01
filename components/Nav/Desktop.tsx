'use client';

import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const DesktopNav = () => {
  const path = usePathname();
  const router = useRouter();

  const isSearchPath = path === '/search' || path.startsWith('/search');
  const isMoviesPath = path === '/movies' || path.startsWith('/movies');

  return (
    <div className='hidden md:flex md:items-center md:justify-between md:text-white md:glassmorphic-background md:py-2 md:px-8 md:fixed md:w-[100%]'>
      <div className='m-0 p-0 flex w-full justify-between'>
        <div className='flex items-center gap-2 ml-6'>
          <div onClick={() => router.push('/')} className='cursor-pointer'>
            <Image src='/icon.png' alt='Icon' height={40} width={40} />
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
            <Link
              href='/favorites'
              className={`hover:font-semibold ${
                path === '/favorites'
                  ? 'text-red-500 font-semibold hover:text-red-600'
                  : 'text-white font-medium hover:text-red-500'
              }`}
            >
              Favorites
            </Link>
          </div>

          <div className='flex items-center gap-2 hover:text-red-500 hover:font-semibold cursor-pointer'>
            <User size={28} className='hover:text-red-500' />
            <p className='text-sm font-medium'>Login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
