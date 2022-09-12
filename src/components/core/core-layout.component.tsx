import { Container, Row } from '@nextui-org/react';
import type { ReactNode } from 'react';

import CoreHeader from './core-header.component';
import CoreFooter from './core-footer.component';
import CoreSide from './core-side.component';

const CoreLayout = ({ children }: { children: ReactNode }) => (
  <Row justify='center'>
    <CoreSide />
    <Container fluid>
      <CoreHeader />
      <Container as='main' fluid>
        {children}
      </Container>
      <CoreFooter />
    </Container>
  </Row>
);

export default CoreLayout;
