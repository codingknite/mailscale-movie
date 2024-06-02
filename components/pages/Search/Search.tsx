'use client';

import FadeHero from '@/components/FadeHero';
import MovieCard from '@/components/MovieCard';
import { useQuery } from '@tanstack/react-query';
import { ApiResponse, MovieProps } from '@/types/movie';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { HandleError } from '@/lib/exception';
import Loading from '@/components/Loading';

interface Props {
  data: MovieProps[];
}

const SearchPage = ({ data }: Props) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const params = useSearchParams();
  const queryParam = params.get('query');

  const [initialData] = useState(data || []);
  const [userInput, setUserInput] = useState(queryParam || '');

  useEffect(() => {
    if (inputRef.current && !userInput) {
      inputRef.current.focus();
    }
  }, [userInput]);

  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['search results', userInput],
    queryFn: async () => {
      const fetchSearchResults = await fetch('/api/search-movies', {
        method: 'POST',
        body: JSON.stringify({
          userInput,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response: ApiResponse = await fetchSearchResults.json();

      if (response.message === 'success') {
        const { data } = response;

        return data.movies.results;
      } else {
        throw new HandleError();
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

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push(`/search?query=${userInput}`);
    }
  };

  if (error) {
    throw new HandleError();
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
              type='text'
              ref={inputRef}
              value={userInput}
              onKeyDown={handleKeyPress}
              onChange={handleUserInput}
              placeholder={userInput || 'Avengers Endgame'}
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
              <Loading />
            ) : error ? (
              <p>An Error Occurred</p>
            ) : (
              <>
                {!searchResults
                  ? initialData.map((movie, index) => (
                      <MovieCard data={movie} key={index} />
                    ))
                  : searchResults.map((movie, index) => (
                      <MovieCard data={movie} key={index} />
                    ))}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
