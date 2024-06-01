import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import { MoviesApiResponse } from '@/types/movie';
import { apiKey, baseApiURL } from '@/utils/helpers';

dotenv.config();

interface RequestDataProps {
  page: number;
  genreId: number;
}

export async function POST(req: Request) {
  try {
    const reqData: RequestDataProps = await req.json();

    const getMovies = await fetch(
      `${baseApiURL}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${reqData.genreId}&page=${reqData.page}`
    );

    if (getMovies.ok) {
      const moviesData: MoviesApiResponse = await getMovies.json();

      return NextResponse.json({
        message: 'success',
        data: {
          movies: moviesData,
        },
      });
    } else {
      return NextResponse.json({
        message: 'failed',
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: 'failed',
      error,
    });
  }
}
