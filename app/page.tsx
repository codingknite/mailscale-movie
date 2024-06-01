import FadeHero from '@/components/FadeHero';
import MovieCard from '@/components/MovieCard';
import React from 'react';

const Home = () => {
  return (
    <main className='text-white'>
      <div className='pt-14'>
        <FadeHero imagePath='/spidey.webp'>
          <div className='p-6 lg:ml-[5rem]'>
            <h1 className='text-5xl w-[70%] font-medium md:w-[50%] md:text-6xl'>
              Spider Man No Way Home
            </h1>
            <p className='text-base font-medium text-gray-200 py-4 w-[90%] md:w-[65%] lg:w-[50%]'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A quod
              excepturi officiis optio nihil quia deserunt modi. Placeat, nihil
              temporibus.
            </p>
            <button className='bg-red-600 py-2.5 px-8 rounded-[2rem] font-medium text-white text-base mt-8 outline-none'>
              Read More
            </button>
          </div>
        </FadeHero>

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-2xl py-3 mt-4'>
            My Favorites
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

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-2xl py-3 mt-4'>
            My Favorites
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

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-2xl py-3 mt-4'>
            My Favorites
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

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-2xl py-3 mt-4'>
            My Favorites
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
      </div>
    </main>
  );
};

export default Home;
