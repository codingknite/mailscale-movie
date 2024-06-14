import { MovieProps } from '@/types/movie';
import { baseImageURL } from '@/utils/helpers';
import { Dot, Star } from 'lucide-react';
import Link from 'next/link';

interface Props {
  data: MovieProps;
}

const MovieCard = ({ data }: Props) => {
  return (
    <Link
      href={`/movie/${data.id}`}
      className='w-[48%] mb-3 md:w-[32%] lg:w-[23%] xl:w-[19%] transition-all ease-in-out duration-500 hover:scale-[1.025]'
    >
      <div
        className='h-[250px] w-full md:h-[275px]'
        style={{
          borderRadius: '8px',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${
            !data.backdrop_path
              ? '/no-image.jpeg'
              : `${baseImageURL}/${data.backdrop_path}`
          })`,
        }}
      />
      <p className='py-2 font-medium text-sm'>{data.title}</p>

      <div className='flex justify-between'>
        <div className='flex items-center'>
          <p className='text-sm font-medium'>
            {data.release_date.split('-')[0]}
          </p>
          <Dot />
          <p className='text-sm font-medium uppercase'>
            {data.original_language}
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <Star size={18} strokeWidth={2.5} />
          <p className='text-sm font-medium'>{Math.round(data.vote_average)}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
