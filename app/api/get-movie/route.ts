import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import { MoviesApiResponse } from '@/types/movie';
import { apiKey, baseApiURL } from '@/utils/helpers';

dotenv.config();

interface RequestDataProps {
  movieId: number;
}

export async function POST(req: Request) {
  try {
    const reqData: RequestDataProps = await req.json();

    const fetchMovieData = await fetch(
      `${baseApiURL}/movie/${reqData.movieId}?api_key=${apiKey}&language=en-US&append_to_response=videos`
    );

    const fetchCast = await fetch(
      `${baseApiURL}/movie/${reqData.movieId}/credits?api_key=${apiKey}&language=en-US`
    );

    const fetchSimilarMovies = await fetch(
      `${baseApiURL}/movie/${reqData.movieId}/recommendations?api_key=${apiKey}&language=en-US`
    );

    if (fetchMovieData.ok && fetchCast.ok && fetchSimilarMovies.ok) {
      const castData = await fetchCast.json();
      const movieData = await fetchMovieData.json();
      const similarMovies = await fetchSimilarMovies.json();

      return NextResponse.json({
        message: 'success',
        data: {
          movie: movieData,
          cast: castData,
          similar: similarMovies.results,
        },
      });
    } else {
      return NextResponse.json({
        message: 'failed',
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: 'Error getting movie',
      error,
    });
  }
}
