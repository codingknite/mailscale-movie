import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ModalOverlay = ({ children }: Props) => {
  return (
    <div
      className='top-0 left-0 right-0
      bottom-0 z-100 fixed overflow-hidden flex items-center justify-center bg-[rgba(0,0,0,0.7)]'
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
