import MovieCard from '@/components/MovieCard';
import React from 'react';

const SearchResults = () => {
  return (
    <main className='text-white'>
      <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
        <h2 className='text-white font-medium text-2xl py-3 mt-4'>
          Search results for "marry"
        </h2>

        <div className='flex flex-wrap gap-2 ml-1 lg:gap-4 lg:ml-2 mt-8'>
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
    </main>
  );
};

export default SearchResults;
