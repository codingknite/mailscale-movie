'use client';

import { useState } from 'react';
import { CastProps } from '@/types/cast';
import { MovieProps } from '@/types/movie';
import { useParams } from 'next/navigation';
import { HandleError } from '@/lib/exception';
import { useQuery } from '@tanstack/react-query';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { baseImageURL } from '@/utils/helpers';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import FadeHero from '@/components/FadeHero';
import MovieCard from '@/components/MovieCard';
import Cast from '@/components/MovieDetails/Cast';
import Genre from '@/components/MovieDetails/Genre';
import useFavorites from '@/hooks/useFavorites';
import LinkButton from '@/components/MovieDetails/Button';
import AuthenticationModel from '@/components/modals/Auth';
import Loading from '@/components/Loading';

interface GenreProps {
  id: number;
  name: string;
}

const Favorites = () => {
  const params = useParams();
  const { id: movieId } = params;
  const { data: session } = useSession();
  const { favorites, addFavorites } = useFavorites();

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['fetch movie details', movieId],
    queryFn: async () => {
      try {
        const getMovieData = await fetch('/api/get-movie', {
          method: 'POST',
          body: JSON.stringify({
            movieId,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const response = await getMovieData.json();

        if (response.message === 'success') {
          const { data } = response;

          return data;
        } else {
          throw new Error(`Failed to get movie data. Error:${error}`);
        }
      } catch (error) {
        throw new Error(`Error getting movie. Error:${error}`);
      }
    },
  });

  if (error) {
    throw new HandleError();
  }

  return (
    <main className='text-white'>
      {!data || isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className=' bg-pink-200 relative'>
            <FadeHero
              imagePath={`${baseImageURL}/${data?.movie.backdrop_path}`}
            />
          </div>

          <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
            <div className='mx-auto flex flex-col items-center md:flex-row md:items-start md:p-6 md:gap-4 lg:gap-2 lg:w-[90%] xl:w-[70%]'>
              <div className='w-[70%] h-[320px] relative hidden md:block md:w-[260px] lg:w-[320px] lg:h-[400px]'>
                <Image
                  src={`${baseImageURL}/${data?.movie.poster_path}`}
                  alt='Movie Name Poster'
                  height={1024}
                  width={1024}
                  className='w-[100%] h-[100%] object-contain lg:object-cover rounded-sm'
                />
              </div>

              <div className='flex flex-col p-6 md:w-[80%] md:py-0'>
                <h1 className='text-4xl font-medium lg:text-5xl lg:w-[90%]'>
                  {data?.movie.title}
                </h1>
                <h2 className='text-lg font-medium text-gray-200 pb-4 pt-2 lg:text-xl lg:py-4'>
                  {data?.movie.tagline}
                </h2>

                <div className='flex gap-4 '>
                  <p className='text-sm text-gray-300 font-medium border-r-[2px] pr-4'>
                    {data?.movie.spoken_languages[0].name}
                  </p>
                  <p className='text-sm text-gray-300 font-medium border-r-[2px] pr-4'>
                    {data?.movie.runtime} Mins
                  </p>
                  <p className='text-sm text-gray-300 font-medium'>
                    {data?.movie.release_date.split('-')[0]}
                  </p>
                </div>

                <div className='flex flex-wrap gap-2 mt-4'>
                  {data?.movie.genres.slice(0, 3).map((genre: GenreProps) => (
                    <Genre name={genre.name} key={genre.id} />
                  ))}
                </div>

                <div className='mt-6'>
                  <p className='text-2xl font-medium text-gray-200 py-2'>
                    The Plot
                  </p>
                  <p className='text-sm font-normal'>{data?.movie.overview}</p>
                </div>

                <div className='flex flex-col flex-wrap items-center justify-between mt-6 gap-5 lg:flex-row'>
                  <button
                    className='bg-red-700 w-full flex items-center justify-center py-3 px-2 gap-2 rounded-smooth text-sm font-medium lg:w-[30%] hover:bg-red-800'
                    onClick={() => {
                      if (session) {
                        addFavorites(Number(movieId));
                      } else {
                        setOpenAuthModal(true);
                      }
                    }}
                  >
                    {favorites.includes(Number(movieId)) ? (
                      <>
                        <ThumbsDown size={20} />
                        Remove favorite
                      </>
                    ) : (
                      <>
                        <ThumbsUp size={20} />
                        Add to favorites
                      </>
                    )}
                  </button>
                  <LinkButton
                    link={`https://www.imdb.com/title/${data?.movie.imdb_id}`}
                    text='See on IMDB'
                  />
                  <LinkButton
                    link={data?.movie.homepage ? data.movie.homepage : '#'}
                    text='Visit Website'
                  />
                </div>
              </div>
            </div>

            <div className='p-6 lg:w-[80%] lg:mx-auto'>
              <p className='text-2xl font-medium text-gray-100'>The Cast</p>

              <div className='mt-6 flex flex-wrap gap-4'>
                {data?.cast.cast
                  .slice(0, 40)
                  .map((cast: CastProps, index: number) => (
                    <Cast
                      name={cast.name}
                      imageLink={cast.profile_path}
                      key={index}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
            <h2 className='text-white font-medium text-2xl py-3 mt-4'>
              Similar Movies
            </h2>

            <div className='flex flex-wrap gap-2 ml-1 lg:gap-4 lg:ml-2 mt-8'>
              {data?.similar.map((movie: MovieProps, index: number) => (
                <MovieCard data={movie} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}

      {openAuthModal ? (
        <AuthenticationModel
          isOpen={openAuthModal}
          closeModal={() => {
            setOpenAuthModal(false);
          }}
        />
      ) : null}
    </main>
  );
};

export default Favorites;
