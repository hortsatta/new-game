import { styled } from '@nextui-org/react';
import { BaseSearch } from '@/components/base';

type Props = {
  isHome: boolean;
};

const Header = styled('header', {
  position: 'absolute',
  top: 0,
  right: 0,
  py: '$10',
  h: '40px',
  w: 'calc(100% - 94px)',
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 8,
  boxSizing: 'content-box',
  transition: 'all 0.6s ease-in-out',
});

export const CoreHeader = ({ isHome }: Props) => (
  <Header
    {...(isHome && {
      css: { py: '54px', w: 'calc(50% - 47px - 200px)', h: '56px' },
    })}
  >
    <BaseSearch />
  </Header>
);
