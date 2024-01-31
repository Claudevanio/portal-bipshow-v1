import Image from 'next/image';

export const Logo = ({onClick}:{onClick?: ()=> void}) => <Image src={'/Logo.svg'} className='cursor-pointer' onClick={onClick && onClick} alt="Logo" width={150} height={55} />;
