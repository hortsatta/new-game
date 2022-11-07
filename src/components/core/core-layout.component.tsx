import { ReactNode, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Row, styled } from '@nextui-org/react';

import { CoreHeader } from './core-header.component';
import { CoreFooter } from './core-footer.component';
import { CoreSide } from './core-side.component';

const MainWrapper = styled('div', {
  pl: '100px',
  w: '100%',
});
const Main = styled('main', {
  pl: '30px',
  pr: '30px',
  w: '100%',
});

export const CoreLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();
  const isHome = useMemo(() => pathname === '/', [pathname]);

  return (
    <Row justify='center'>
      <CoreSide />
      <MainWrapper>
        <CoreHeader isHome={isHome} />
        <Main>{children}</Main>
        <CoreFooter />
      </MainWrapper>
    </Row>
  );
};
