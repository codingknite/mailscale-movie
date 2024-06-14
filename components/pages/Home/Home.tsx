'use client';

import Link from 'next/link';
import FadeHero from '@/components/FadeHero';
import MovieCard from '@/components/MovieCard';
import { MovieProps } from '@/types/movie';
import { baseImageURL } from '@/utils/helpers';

interface Props {
  popular: MovieProps[];
  upcoming: MovieProps[];
  nowPlaying: MovieProps[];
  featuredMovieIndex: number;
}
const HomePage = ({
  popular,
  upcoming,
  nowPlaying,
  featuredMovieIndex,
}: Props) => {
  const featuredMovie = popular[featuredMovieIndex];

  return (
    <main className='text-white'>
      <div className='pt-14'>
        <FadeHero imagePath={`${baseImageURL}/${featuredMovie.backdrop_path}`}>
          <div className='p-6 lg:ml-[5rem]'>
            <h1 className='text-5xl w-[70%] font-medium md:w-[50%] md:text-6xl'>
              {featuredMovie.title}
            </h1>
            <p className='text-base font-medium text-gray-200 py-4 w-[90%] md:w-[65%] lg:w-[50%] mb-8'>
              {featuredMovie.overview}
            </p>
            <Link
              href={`/movie/${featuredMovie.id}`}
              className='bg-red-600 py-3 px-8 rounded-smooth font-medium text-white text-base outline-none hover:bg-red-700'
            >
              Read More
            </Link>
          </div>
        </FadeHero>

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-2xl py-3 mt-4'>
            Popular Movies
          </h2>

          <div className='flex flex-wrap gap-2 ml-1 lg:gap-4 lg:ml-2 mt-8'>
            {popular.map((movie, index) => (
              <MovieCard data={movie} key={index} />
            ))}
          </div>
        </div>

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-2xl py-3 mt-4'>
            Now Playing In Cinemas
          </h2>

          <div className='flex flex-wrap gap-2 ml-1 lg:gap-4 lg:ml-2 mt-8'>
            {nowPlaying.map((movie, index) => (
              <MovieCard data={movie} key={index} />
            ))}
          </div>
        </div>

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-2xl py-3 mt-4'>
            Upcoming Movies
          </h2>

          <div className='flex flex-wrap gap-2 ml-1 lg:gap-4 lg:ml-2 mt-8'>
            {upcoming.map((movie, index) => (
              <MovieCard data={movie} key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
