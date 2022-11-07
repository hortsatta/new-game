import { Image, Row, Text } from '@nextui-org/react';

const currentDate = new Date();

const CoreFooter = () => (
  <Row css={{ mx: 'auto', py: '190px', w: 'fit-content', opacity: 0.6 }} fluid>
    <Image
      containerCss={{ m: 0, mr: '$5' }}
      src='/images/footer-logo.svg'
      alt='footer logo'
      width={57}
      height={28}
    />
    <Text
      css={{ maxWidth: '362px', fontSize: '$xs', lineHeight: 1.4 }}
    >{`© ${currentDate.getFullYear()} New Game Corporation. All rights reserved. All trademarks
are property of their respective owners in the US and other countries.`}</Text>
  </Row>
);

export default CoreFooter;
