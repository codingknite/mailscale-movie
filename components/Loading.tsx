'use client';

import { Oval } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='h-screen flex items-center justify-center '>
      <div className='flex flex-col gap-6 items-center'>
        <Oval
          visible={true}
          height='60'
          width='60'
          color='#f9fbf9'
          secondaryColor='#020202'
          ariaLabel='oval-loading'
        />
        <p className='text-xl font-medium text-gray-200'>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
