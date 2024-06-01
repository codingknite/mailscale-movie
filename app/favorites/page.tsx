'use client';

import Link from 'next/link';
import FadeHero from '@/components/FadeHero';
import MovieCard from '@/components/MovieCard';
import useFavorites from '@/hooks/useFavorites';
import { useQuery } from '@tanstack/react-query';
import { baseImageURL } from '@/utils/helpers';
import { MovieProps } from '@/types/movie';
import { HandleError } from '@/lib/exception';

const Favorites = () => {
  const { favorites } = useFavorites();

  const { data, isLoading, error } = useQuery({
    queryKey: ['fetch all favorites', favorites],
    queryFn: async () => {
      try {
        const fetchFavorites = await fetch('/api/get-favorites', {
          method: 'POST',
          body: JSON.stringify({
            favorites,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const response = await fetchFavorites.json();
        const { data } = response;

        return data;
      } catch (error) {
        throw new Error('Error fetching favorites');
      }
    },
    refetchOnMount: true,
  });

  if (isLoading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  if (error) {
    throw new HandleError();
  }

  const randomFeature = Math.floor(Math.random() * favorites.length);
  const featuredMovie: MovieProps = data && data[randomFeature];

  return (
    <main className='text-white'>
      <div className=''>
        <FadeHero
          imagePath={`${
            featuredMovie.backdrop_path
              ? '/search-poster-2.jpeg'
              : `${baseImageURL}/${
                  featuredMovie && featuredMovie.backdrop_path
                }`
          } `}
        >
          <div className='p-6 lg:ml-[5rem]'>
            <h1 className='text-5xl w-[70%] font-medium md:w-[50%] md:text-6xl'>
              {featuredMovie && featuredMovie.title}
            </h1>
            <p className='text-base font-medium text-gray-200 py-4 w-[90%] md:w-[65%] lg:w-[50%] mb-6'>
              {featuredMovie && featuredMovie.overview}
            </p>

            <Link
              href={`/movie/${featuredMovie && featuredMovie.id}`}
              className='bg-red-600 py-2.5 px-8 rounded-[2rem] font-medium text-white text-base mt-8 outline-none'
            >
              Read More
            </Link>
          </div>
        </FadeHero>

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-2xl py-3 mt-4'>
            My Favorites
          </h2>

          <div className='flex flex-wrap gap-2 ml-1 lg:gap-4 lg:ml-2 mt-8'>
            {data &&
              data.map((movie: MovieProps) => <MovieCard data={movie} />)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Favorites;
