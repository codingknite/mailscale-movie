import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import { apiKey, baseApiURL } from '@/utils/helpers';
import { MovieProps } from '@/types/movie';

dotenv.config();

interface ApiResponse {
  page: number;
  results: MovieProps[];
  total_pages: number;
  total_results: number;
}

export async function GET(req: Request) {
  try {
    const fetchAll = {
      popular: await fetch(
        `${baseApiURL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      ),
      upcoming: await fetch(
        `${baseApiURL}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
      ),
      nowPlaying: await fetch(
        `${baseApiURL}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
      ),
    };

    const [popular, upcoming, nowPlaying] = await Promise.all([
      fetchAll.popular,
      fetchAll.upcoming,
      fetchAll.nowPlaying,
    ]);

    if (popular.ok && upcoming.ok && nowPlaying.ok) {
      const popularMovies: ApiResponse = await popular.json();
      const upcomingMovies: ApiResponse = await upcoming.json();
      const nowPlayingMovies: ApiResponse = await nowPlaying.json();

      return NextResponse.json({
        message: 'success',
        data: {
          popular: popularMovies.results,
          upcoming: upcomingMovies.results,
          nowPlaying: nowPlayingMovies.results,
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
