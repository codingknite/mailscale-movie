import { ReactNode } from 'react';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  imagePath: string;
  children?: ReactNode;
}

const FadeHero = ({ children, imagePath }: Props) => {
  return (
    <div
      className='h-[65vh] flex items-center justify-center md:h-[75vh] lg:justify-start'
      style={{
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), #000000), url('${imagePath}')`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeHero;
