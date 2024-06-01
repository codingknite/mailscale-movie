'use client';

import FadeHero from '@/components/FadeHero';
import MovieCard from '@/components/MovieCard';
import { MovieProps, MoviesApiResponse } from '@/types/movie';
import { baseApiURL } from '@/utils/helpers';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  data: MovieProps[];
}

const SearchPage = ({ data }: Props) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const [userInput, setUserInput] = useState('');

  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['search results', userInput],
    queryFn: async () => {
      const fetchSearchResults = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&query=${userInput}`
      );

      if (fetchSearchResults.ok) {
        const searchResults: MoviesApiResponse =
          await fetchSearchResults.json();

        return searchResults.results;
      } else {
        // todo: error handling
      }
    },
    enabled: !!userInput,
  });

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserInput(value);
  };

  if (error) {
    // todo: proper error handling
    return (
      <div>
        <p>Error Loading</p>
      </div>
    );
  }

  return (
    <main className='text-white'>
      <div>
        <FadeHero imagePath='/search-poster-2.jpeg'>
          <form
            onSubmit={handleSearch}
            className='w-[85%] mx-auto flex items-center justify-center md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]'
          >
            <input
              autoFocus
              type='text'
              value={userInput}
              onChange={handleUserInput}
              placeholder='Avengers Endgame'
              className='bg-gray-200 border-gray-300 border-[1.25px] w-full py-3 px-6 rounded-[2rem] outline-none font-normal text-base text-black'
            />
          </form>
        </FadeHero>

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-3xl py-3 mt-4'>
            {!userInput ? 'Recommended For You' : `Results for "${userInput}"`}
          </h2>

          <div className='flex flex-wrap gap-2 ml-1 lg:gap-4 lg:ml-2 mt-4'>
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>An Error Occurred</p>
            ) : (
              <>
                {!searchResults
                  ? data.map((movie) => <MovieCard data={movie} />)
                  : searchResults.map((movie) => <MovieCard data={movie} />)}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
