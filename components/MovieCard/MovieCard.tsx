import { Dot, Star } from 'lucide-react';
import Link from 'next/link';

interface Props {
  name: string;
  year: number;
  time: number;
  rating: number;
  poster: string;
}

const MovieCard = () => {
  return (
    <Link
      href='/movie/id'
      className='w-[48%] mb-3 md:w-[32%] lg:w-[23%] xl:w-[19%]'
    >
      <div
        className='h-[250px] w-full md:h-[275px]'
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(/poster.jpeg)',
        }}
      />
      <p className='py-2 font-medium text-sm'>Avengers: Infinity Game</p>

      <div className='flex justify-between'>
        <div className='flex items-center'>
          <p className='text-sm font-medium'>2023</p>
          <Dot />
          <p className='text-sm font-medium'>109m</p>
        </div>

        <div className='flex items-center gap-2'>
          <Star size={18} strokeWidth={2.5} />
          <p className='text-sm font-medium'>5</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
