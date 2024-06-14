'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BookMarked, Home, Menu, Search, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const MobileNav = () => {
  const route = useRouter();
  const path = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const isSearchPath = path === '/search' || path.startsWith('/search');
  const isMoviesPath = path === '/movies' || path.startsWith('/movies');

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

      <div onClick={() => route.push('/')}>
        <Image src='/icon.png' alt='Icon' height={35} width={35} />
      </div>

      <div>
        <User size={28} className='text-gray-100' />
      </div>

      {openNav ? (
        <div className='absolute top-[110%] bg-white w-[90%] p-6 flex flex-col items-center gap-6 rounded-custom'>
          <Link
            href='/'
            className={`w-full text-center p-3 text-base rounded-custom flex items-center justify-center gap-2 ${
              path === '/'
                ? 'bg-gray-950 font-semibold text-base text-white'
                : 'bg-gray-50 border-gray-200 border-[1.25px] text-black font-medium'
            }`}
            onClick={handleNav}
          >
            <Home />
            Home
          </Link>
          <Link
            href='/movies'
            className={`w-full text-center p-3 text-base rounded-custom flex items-center justify-center gap-2 ${
              isMoviesPath
                ? 'bg-gray-950 font-semibold text-base text-white'
                : 'bg-gray-50 border-gray-200 border-[1.25px] text-black font-medium'
            }`}
            onClick={handleNav}
          >
            <Search size={20} />
            Movies
          </Link>
          <Link
            href='/search'
            className={`w-full text-center p-3 text-base rounded-custom flex items-center justify-center gap-2 ${
              isSearchPath
                ? 'bg-gray-950 font-semibold text-base text-white'
                : 'bg-gray-50 border-gray-200 border-[1.25px] text-black font-medium'
            }`}
            onClick={handleNav}
          >
            <Search size={20} />
            Search
          </Link>
          <Link
            href='/favorites'
            className={`w-full text-center p-3 text-base rounded-custom flex items-center justify-center gap-2 ${
              path === '/favorites'
                ? 'bg-gray-950 font-semibold text-base text-white'
                : 'bg-gray-50 border-gray-200 border-[1.25px] text-black font-medium'
            }`}
            onClick={handleNav}
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
