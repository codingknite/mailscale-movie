'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BookMarked, Home, Menu, Search, User, X } from 'lucide-react';
import Link from 'next/link';

const MobileNav = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className='flex items-center justify-between py-2.5 px-6 bg-none fixed w-[100%] glassmorphic-background md:hidden'>
      {openNav ? (
        <X size={28} onClick={handleNav} className='text-gray-100' />
      ) : (
        <Menu size={28} onClick={handleNav} className='text-gray-100' />
      )}

      <div>
        <Image src='/icon.png' alt='Icon' height={35} width={35} />
      </div>

      <div>
        <User size={28} className='text-gray-100' />
      </div>

      {openNav ? (
        <div className='absolute top-[110%] bg-white w-[90%] p-6 flex flex-col items-center gap-6 rounded-custom'>
          <Link
            href='/'
            className='bg-gray-950 w-full text-center p-3 font-semibold text-base rounded-custom text-white flex items-center justify-center gap-2'
          >
            <Home />
            Home
          </Link>
          <Link
            href='/search'
            className='text-black w-full text-center p-3 font-medium text-sm rounded-custom flex items-center justify-center gap-2 bg-gray-50 border-gray-200 border-[1.25px]'
          >
            <Search size={20} />
            Search
          </Link>
          <Link
            href='/favorites'
            className='text-black w-full text-center p-3 font-medium text-sm rounded-custom flex items-center justify-center gap-2 bg-gray-50 border-gray-200 border-[1.25px]'
          >
            <BookMarked size={20} />
            Favorites
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
