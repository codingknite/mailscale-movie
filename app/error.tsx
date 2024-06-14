'use client';

import { Bot } from 'lucide-react';
import Link from 'next/link';

const Error = ({ reset }: { reset: () => void }) => {
  return (
    <div className='h-screen flex items-center justify-center text-white'>
      <div className='flex flex-col items-center gap-8'>
        <Bot size={58} className='text-red-700' />
        <h1 className='font-semibold text-4xl'>Oops...something went wrong</h1>

        <div className='flex gap-6'>
          <button
            className='bg-red-600 py-2.5 px-8 rounded-smooth hover:bg-red-700 text-sm font-medium'
            onClick={reset}
          >
            Retry
          </button>
          <Link
            href='/'
            className='bg-gray-600 py-2.5 px-8 rounded-smooth hover:bg-gray-700 text-sm font-medium'
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
