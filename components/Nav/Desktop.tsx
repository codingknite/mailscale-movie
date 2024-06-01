import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DesktopNav = () => {
  return (
    <div className='hidden md:flex md:items-center md:justify-between md:text-white md:glassmorphic-background md:py-2 md:px-8 md:fixed md:w-[100%]'>
      <div className='m-0 p-0 flex w-full justify-between'>
        <div className='flex items-center gap-2 ml-6'>
          <div>
            <Image src='/icon.png' alt='Icon' height={40} width={40} />
          </div>
        </div>

        <div className='flex items-center gap-10 mr-6'>
          <div className='flex items-center gap-8 text-sm'>
            <Link
              href='/'
              className='font-semibold text-red-500 hover:text-red-600 hover:font-semibold'
            >
              Home
            </Link>
            <Link
              href='/movies'
              className='hover:text-red-500 hover:font-semibold'
            >
              Movies
            </Link>
            <Link
              href='/series'
              className='hover:text-red-500 hover:font-semibold'
            >
              Series
            </Link>
            <Link
              href='/search'
              className='hover:text-red-500 hover:font-semibold'
            >
              Search
            </Link>
            <Link
              href='/favorites'
              className='hover:text-red-500 hover:font-semibold'
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
