import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import { apiKey, baseApiURL } from '@/utils/helpers';

dotenv.config();

interface RequestDataProps {
  favorites: number[];
}

export async function POST(req: Request) {
  try {
    const reqData: RequestDataProps = await req.json();

    const promises = reqData.favorites.map(async (fav) => {
      const response = await fetch(
        `${baseApiURL}/movie/${fav}?api_key=${apiKey}&language=en-US&append_to_response=videos`
      );

      if (response.ok) {
        const movieData = await response.json();
        return movieData;
      } else {
        return NextResponse.json({
          message: 'failed',
        });
      }
    });

    const data = await Promise.all(promises);

    return NextResponse.json({
      message: 'success',
      data,
    });
  } catch (error) {
    return NextResponse.json({
      message: 'failed',
      error,
    });
  }
}
