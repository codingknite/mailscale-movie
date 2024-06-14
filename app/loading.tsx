'use client';

import { Oval } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='h-screen flex items-center justify-center text-white'>
      <div className='flex flex-col items-center gap-8'>
        <Oval
          visible={true}
          height='80'
          width='80'
          color='#f9fbf9'
          secondaryColor='#020202'
          ariaLabel='oval-loading'
        />
        <h1 className='font-semibold text-xl'>loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
