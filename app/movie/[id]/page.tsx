'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import FadeHero from '@/components/FadeHero';
import MovieCard from '@/components/MovieCard';
import Cast from '@/components/MovieDetails/Cast';
import Genre from '@/components/MovieDetails/Genre';
import LinkButton from '@/components/MovieDetails/Button';
import { useQuery } from '@tanstack/react-query';
import { baseApiURL, baseImageURL } from '@/utils/helpers';
import { MovieProps } from '@/types/movie';
import { CastProps } from '@/types/cast';
import { useState } from 'react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface GenreProps {
  id: number;
  name: string;
}

let initialFavorites: number[] = [];

try {
  initialFavorites = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
} catch (error) {
  initialFavorites = [];
  console.error('Failed to parse favorite movies');
}

const Favorites = () => {
  const params = useParams();
  const { id: movieId } = params;
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const [favorites, setFavorites] = useState(initialFavorites);

  const { data, isLoading, error } = useQuery({
    queryKey: ['fetch movie detils', movieId],
    queryFn: async () => {
      const fetchMovieData = await fetch(
        `${baseApiURL}/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=videos`
      );

      const fetchCast = await fetch(
        `${baseApiURL}/${movieId}/credits?api_key=${apiKey}&language=en-US`
      );

      const fetchSimilarMovies = await fetch(
        `${baseApiURL}/${movieId}/recommendations?api_key=${apiKey}&language=en-US`
      );

      if (fetchMovieData.ok && fetchCast.ok && fetchSimilarMovies.ok) {
        const castData = await fetchCast.json();
        const movieData = await fetchMovieData.json();
        const similarMovies = await fetchSimilarMovies.json();

        return { movieData, castData, similarMovies: similarMovies.results };
      }
    },
  });

  const addFavoriteMovie = (id: number) => {
    // todo: check if user is authenticated, if not show login modal

    if (!favorites.includes(id)) {
      const favsCopy = [...favorites];
      setFavorites([...favorites, id]);
      favsCopy.push(id);
      localStorage.setItem('favoriteMovies', JSON.stringify(favsCopy));
    } else {
      console.log('ITEM ALREADY EXISTS');
      const favsCopy = [...favorites];
      const index = favorites.indexOf(id);
      favsCopy.splice(index, 1);
      setFavorites(favsCopy);
      localStorage.setItem('favoriteMovies', JSON.stringify(favsCopy));
    }
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    // todo: handleError
    console.log('ERROR', error);
    return (
      <div>
        <p>An error occured</p>
      </div>
    );
  }

  return (
    <main className='text-white'>
      <div>
        <div className=' bg-pink-200 relative'>
          <FadeHero
            imagePath={`${baseImageURL}/${data?.movieData.backdrop_path}`}
          />
        </div>

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <div className='mx-auto flex flex-col items-center md:flex-row md:items-start md:p-6 md:gap-4 lg:gap-2 lg:w-[90%] xl:w-[70%]'>
            <div className='w-[70%] h-[320px] relative hidden md:block md:w-[260px] lg:w-[320px] lg:h-[400px]'>
              <Image
                src={`${baseImageURL}/${data?.movieData.poster_path}`}
                alt='Movie Name Poster'
                height={1024}
                width={1024}
                className='w-[100%] h-[100%] object-contain lg:object-cover rounded-sm'
              />
            </div>

            <div className='flex flex-col p-6 md:w-[80%] md:py-0'>
              <h1 className='text-4xl font-medium lg:text-5xl lg:w-[90%]'>
                {data?.movieData.title}
              </h1>
              <h2 className='text-lg font-medium text-gray-200 pb-4 pt-2 lg:text-xl lg:py-4'>
                {data?.movieData.tagline}
              </h2>

              <div className='flex gap-4 '>
                <p className='text-sm text-gray-300 font-medium border-r-[2px] pr-4'>
                  {data?.movieData.spoken_languages[0].name}
                </p>
                <p className='text-sm text-gray-300 font-medium border-r-[2px] pr-4'>
                  {data?.movieData.runtime} Mins
                </p>
                <p className='text-sm text-gray-300 font-medium'>
                  {data?.movieData.release_date.split('-')[0]}
                </p>
              </div>

              <div className='flex flex-wrap gap-2 mt-4'>
                {data?.movieData.genres.slice(0, 3).map((genre: GenreProps) => (
                  <Genre name={genre.name} key={genre.id} />
                ))}
              </div>

              <div className='mt-6'>
                <p className='text-2xl font-medium text-gray-200 py-2'>
                  The Plot
                </p>
                <p className='text-sm font-normal'>
                  {data?.movieData.overview}
                </p>
              </div>

              <div className='flex flex-col flex-wrap items-center justify-between mt-6 gap-5 lg:flex-row'>
                <button
                  className='bg-red-700 w-full flex items-center justify-center py-3 px-2 gap-2 rounded-smooth text-sm font-medium lg:w-[30%] hover:bg-red-800'
                  onClick={() => addFavoriteMovie(Number(movieId))}
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
                  link={`https://www.imdb.com/title/${data?.movieData.imdb_id}`}
                  text='See on IMDB'
                />
                <LinkButton
                  link={
                    data?.movieData.homepage ? data.movieData.homepage : '#'
                  }
                  text='Visit Website'
                />
              </div>
            </div>
          </div>

          <div className='p-6 lg:w-[80%] lg:mx-auto'>
            <p className='text-2xl font-medium text-gray-100'>The Cast</p>

            <div className='mt-6 flex flex-wrap gap-4'>
              {data?.castData.cast.slice(0, 40).map((cast: CastProps) => (
                <Cast name={cast.name} imageLink={cast.profile_path} />
              ))}
            </div>
          </div>
        </div>

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-2xl py-3 mt-4'>
            Similar Movies
          </h2>

          <div className='flex flex-wrap gap-2 ml-1 lg:gap-4 lg:ml-2 mt-8'>
            {data?.similarMovies.map((movie: MovieProps) => (
              <MovieCard data={movie} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Favorites;
