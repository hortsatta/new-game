import { styled } from '@nextui-org/react';
import CoreLogo from './core-logo.component';
import CoreNav from './core-nav.component';

const Aside = styled('aside', {
  position: 'fixed',
  left: 0,
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  py: '$10',
  px: 0,
  w: '100px',
  h: '100vh',
  borderRight: '1px solid $primaryBorder',
  zIndex: 9,
});

const CoreSide = ({ ...moreProps }) => (
  <Aside {...moreProps}>
    <CoreLogo width='60px' />
    <CoreNav />
  </Aside>
);

export default CoreSide;
