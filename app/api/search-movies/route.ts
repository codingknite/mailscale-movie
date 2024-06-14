import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import { MoviesApiResponse } from '@/types/movie';
import { apiKey, baseApiURL } from '@/utils/helpers';

dotenv.config();

interface RequestDataProps {
  userInput: string;
}

export async function POST(req: Request) {
  try {
    const reqData: RequestDataProps = await req.json();

    const getMovies = await fetch(
      `${baseApiURL}/search/movie?api_key=${apiKey}&language=en-US&page=1&query=${reqData.userInput}`
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
