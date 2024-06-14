'use client';

import { useState } from 'react';
import { ApiResponse } from '@/types/movie';
import { genres } from '@/utils/categories';
import { HandleError } from '@/lib/exception';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import Loading from '@/components/Loading';

interface GenreProps {
  id: number;
  name: string;
}

const SearchResults = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');

  const [page, setCurrentPage] = useState(Number(pageParam) || 1);
  const [selectedGenre, setSelectedGenre] = useState<GenreProps>({
    id: 28,
    name: 'Action',
  });

  const fetchProjects = async (page = 1) => {
    try {
      const getMovies = await fetch('/api/get-movies', {
        method: 'POST',
        body: JSON.stringify({
          page,
          genreId: selectedGenre.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response: ApiResponse = await getMovies.json();

      if (response.message === 'success') {
        const data = { response };
        return data.response.data.movies;
      } else {
        throw new HandleError();
      }
    } catch (error) {
      throw new HandleError();
    }
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['movies', pageParam, selectedGenre.name],
    queryFn: () => fetchProjects(Number(page)),
  });

  if (error) {
    throw new HandleError();
  }

  return (
    <main className='text-white p-5'>
      <div className='pt-14 2xl:w-[1440px] 2xl:mx-auto'>
        <h2 className='text-white font-medium text-5xl px-6 py-6 mt-4'>
          Movies
        </h2>

        <div className='flex gap-4 px-4 overflow-y-scroll scrollbar-none py-2.5'>
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`text-black py-3 px-6 rounded-smooth text-sm font-medium min-w-[160px] ${
                selectedGenre.name === genre.name
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50'
              }`}
              onClick={() => {
                setSelectedGenre({
                  ...selectedGenre,
                  id: genre.id,
                  name: genre.name,
                });
              }}
            >
              {genre.name}
            </button>
          ))}
        </div>

        <h2 className='text-white font-medium text-2xl px-6 py-4 mt-4'>
          Showing results for {selectedGenre.name}
        </h2>

        {isLoading ? (
          <Loading />
        ) : (
          <div className='flex flex-wrap gap-2 ml-1 lg:gap-4 lg:ml-2 mt-8'>
            {data?.results.map((movie, index) => (
              <MovieCard data={movie} key={index} />
            ))}
          </div>
        )}

        {!data ? null : (
          <div className='my-10 flex flex-wrap items-center justify-center gap-6'>
            <Link
              href={`/movies?page=${
                Number(page) - 1 === 0 ? 1 : Number(page) - 1
              }`}
              className={`bg-red-600 py-3 px-8 rounded-smooth text-sm font-medium flex items-center gap-2 hover:bg-red-700 ${
                Number(page) - 1 === 0
                  ? 'cursor-not-allowed bg-gray-700 hover:bg-gray-700 text-gray-300'
                  : ''
              }`}
              onClick={() => {
                if (page > 1) {
                  setCurrentPage(() => page - 1);
                }
              }}
            >
              <ChevronLeft size={20} />
              Prev Page
            </Link>
            <Link
              href={`/movies?page=${
                Number(page) + 1 === data.total_pages
                  ? data.total_pages
                  : Number(page) + 1
              }`}
              className={`bg-red-600 py-3 px-8 rounded-smooth text-sm font-medium flex items-center gap-2 hover:bg-red-700 ${
                Number(page) + 1 === data.total_pages
                  ? 'cursor-not-allowed bg-gray-700 hover:bg-gray-700 text-gray-300'
                  : ''
              }`}
              onClick={() => {
                setCurrentPage(() => page + 1);
              }}
            >
              Next Page
              <ChevronRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchResults;
