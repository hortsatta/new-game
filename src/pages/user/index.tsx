import { Image, Row, styled } from '@nextui-org/react';
import type { NextPage } from 'next';

import { BaseScene } from '@/components/base';

const Center = styled('div', {
  d: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
});

const UserPage: NextPage = () => {
  return (
    <BaseScene>
      <Row
        css={{ m: '0 auto', maxW: '1366px' }}
        justify='center'
        align='center'
      >
        <Center>
          <Image
            containerCss={{ m: 0, maxW: 'auto', opacity: 0.7 }}
            width={500}
            objectFit='cover'
            src='/images/logo.svg'
            alt='new game logo'
          />
        </Center>
      </Row>
    </BaseScene>
  );
};

export default UserPage;
