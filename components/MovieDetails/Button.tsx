import { Eye, Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
  text: string;
}

const Button = ({ text }: Props) => {
  return (
    <button className='bg-red-700 w-full flex items-center justify-center py-3 px-2 gap-1 rounded-smooth text-sm font-medium lg:w-[30%] hover:bg-red-800'>
      {text === 'Watch trailer' ? (
        <Eye size={19} strokeWidth={2.25} />
      ) : text === 'See on IMDB' ? (
        <Image src='/imdb.png' alt='imdb logo' height={32} width={32} />
      ) : (
        <Plus size={19} strokeWidth={2.25} />
      )}
      {text}
    </button>
  );
};

export default Button;
