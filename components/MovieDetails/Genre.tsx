import { Disc2 } from 'lucide-react';
import React from 'react';

interface Props {
  name: string;
}

const Genre = ({ name }: Props) => {
  return (
    <div className='flex items-center gap-1'>
      <Disc2 size={18} className='text-red-700' strokeWidth={2.5} />
      <p className='text-sm font-medium text-gray-300'>{name}</p>
    </div>
  );
};

export default Genre;
