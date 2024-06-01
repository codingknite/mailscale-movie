import Image from 'next/image';

interface Props {
  name: string;
  imageLink: string;
}
const Cast = ({ name, imageLink }: Props) => {
  return (
    <div className='flex items-center gap-2.5 w-[45%] md:w-[31%] lg:w-[22%]'>
      <div>
        <Image
          width={50}
          height={50}
          alt='Cast Member'
          src={`${imageLink}`}
          className='h-[45px] w-[45px] rounded-full'
        />
      </div>

      <p className='text-sm text-gray-200 font-medium w-[70%]'>{name}</p>
    </div>
  );
};

export default Cast;
