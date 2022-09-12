import { Image } from '@nextui-org/react';

const CoreLogo = ({ ...moreProps }) => (
  <Image src='/images/logo.svg' alt='site logo' {...moreProps} />
);

export default CoreLogo;
