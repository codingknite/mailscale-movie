import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import { MoviesApiResponse } from '@/types/movie';
import { apiKey, baseApiURL } from '@/utils/helpers';

dotenv.config();

export async function GET(req: Request) {
  try {
    const getRecommendations = await fetch(
      `${baseApiURL}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=878`
    );

    if (getRecommendations.ok) {
      const moviesData: MoviesApiResponse = await getRecommendations.json();

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
