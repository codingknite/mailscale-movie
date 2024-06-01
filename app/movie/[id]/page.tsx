import FadeHero from '@/components/FadeHero';
import MovieCard from '@/components/MovieCard';
import Button from '@/components/MovieDetails/Button';
import Cast from '@/components/MovieDetails/Cast';
import Genre from '@/components/MovieDetails/Genre';
import Image from 'next/image';

const Favorites = () => {
  return (
    <main className='text-white'>
      <div>
        <div className=' bg-pink-200 relative'>
          <FadeHero imagePath='/search-poster.webp' />
        </div>

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <div className='mx-auto flex flex-col items-center md:flex-row md:items-start md:p-6 md:gap-4 lg:gap-2 lg:w-[90%] xl:w-[70%]'>
            <div className='w-[70%] h-[320px] relative hidden md:block md:w-[260px] lg:w-[320px] lg:h-[400px]'>
              <Image
                src='/poster.jpeg'
                alt='Movie Name Poster'
                height={1024}
                width={1024}
                className='w-[100%] h-[100%] object-contain lg:object-cover rounded-sm'
              />
            </div>

            <div className='flex flex-col p-6 md:w-[80%] md:py-0'>
              <h1 className='text-4xl font-medium lg:text-5xl lg:w-[90%]'>
                Kingdom of the Planet of the Apes
              </h1>
              <h2 className='text-lg font-medium text-gray-200 pb-4 pt-2 lg:text-xl lg:py-4'>
                No one can stop the reign
              </h2>

              <div className='flex gap-4 '>
                <p className='text-sm text-gray-300 font-medium border-r-[2px] pr-4'>
                  English
                </p>
                <p className='text-sm text-gray-300 font-medium border-r-[2px] pr-4'>
                  145 Mins
                </p>
                <p className='text-sm text-gray-300 font-medium'>May, 2024</p>
              </div>

              <div className='flex flex-wrap gap-2 mt-4'>
                <Genre name='Science Fiction' />
                <Genre name='Science Fiction' />
                <Genre name='Science Fiction' />
              </div>

              <div className='mt-6'>
                <p className='text-2xl font-medium text-gray-200 py-2'>
                  The Plot
                </p>
                <p className='text-sm font-normal'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae ratione, soluta aut accusantium laudantium molestias
                  quam neque ut debitis excepturi blanditiis itaque voluptate
                  nulla placeat minima eaque obcaecati, officia commodi incidunt
                  ad quia dolore aliquid. Saepe fugiat possimus quibusdam!
                  Ipsam.
                </p>
              </div>

              <div className='flex flex-col flex-wrap items-center justify-between mt-6 gap-5 lg:flex-row'>
                <Button text='Add to favorites' />
                <Button text='See on IMDB' />
                <Button text='Watch trailer' />
              </div>
            </div>
          </div>

          <div className='p-6 lg:w-[70%] lg:mx-auto'>
            <p className='text-lg font-medium text-gray-100'>Top Cast</p>

            <div className='mt-6 flex flex-wrap gap-4'>
              <Cast name='Chris Hemsworth' imageLink='/poster.jpeg' />
              <Cast name='Tom Holland Hemsworth' imageLink='/poster.jpeg' />
              <Cast name='Chris Hemsworth' imageLink='/poster.jpeg' />
              <Cast name='Chris Hemsworth' imageLink='/poster.jpeg' />
              <Cast name='Chris Hemsworth' imageLink='/poster.jpeg' />
            </div>
          </div>
        </div>

        <div className='p-6 2xl:w-[1440px] 2xl:mx-auto'>
          <h2 className='text-white font-medium text-2xl py-3 mt-4'>
            Similar Movies
          </h2>

          <div className='flex flex-wrap gap-2 ml-1 lg:gap-4 lg:ml-2 mt-8'>
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Favorites;
