import { ReactNode, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Container, Row } from '@nextui-org/react';

import CoreHeader from './core-header.component';
import CoreFooter from './core-footer.component';
import CoreSide from './core-side.component';

const CoreLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();
  const isHome = useMemo(() => pathname === '/', [pathname]);

  return (
    <Row justify='center'>
      <CoreSide />
      <Container fluid>
        <CoreHeader isHome={isHome} />
        <Container as='main' fluid>
          {children}
        </Container>
        <CoreFooter />
      </Container>
    </Row>
  );
};

export default CoreLayout;
