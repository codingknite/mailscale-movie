'use client';

import FadeHero from '@/components/FadeHero';
import MovieCard from '@/components/MovieCard';
import { FormEvent } from 'react';

const Search = () => {
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className='text-white'>
      <div>
        <FadeHero imagePath='/search-poster.webp'>
          <form
            onSubmit={handleSearch}
            className='w-[85%] mx-auto flex items-center justify-center md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]'
          >
            <input
              autoFocus
              type='text'
              placeholder='Avengers Endgame'
              className='bg-gray-200 border-gray-300 border-[1.25px] w-full py-3 px-6 rounded-[2rem] outline-none font-normal text-base text-black'
            />
          </form>
        </FadeHero>

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-3xl py-3 mt-4'>
            Recommended For You
          </h2>

          <div className='flex flex-wrap gap-2 ml-1 lg:gap-4 lg:ml-2 mt-4'>
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Search;
