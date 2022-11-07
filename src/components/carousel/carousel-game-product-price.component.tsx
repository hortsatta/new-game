import { Badge, CSS, Row, styled, Text } from '@nextui-org/react';

type Props = {
  price: number;
  discount?: number;
  css?: CSS;
};

const Wrapper = styled('div', {});

export const CarouselGameProductPrice = ({ price, discount, css }: Props) => {
  const main = price.toString().split('.')[0];
  const cents = price.toString().split('.')[1];

  return (
    <Wrapper>
      {!!discount && (
        <Badge
          css={{
            ml: '34px',
            pb: '3px',
            minWidth: '48px',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            border: 0,
          }}
          color='success'
        >
          {discount}% off
        </Badge>
      )}
      <Row css={{ alignItems: 'flex-start', w: 'max-content', ...css }}>
        <Text css={{ mr: '$2' }} weight='semibold' size='$3xl' span>
          $
        </Text>
        <Text
          css={{ mr: '$2', lineHeight: 1 }}
          weight='semibold'
          size='$7xl'
          span
        >
          {main}
        </Text>
        <Text css={{ mt: '20px' }} weight='semibold' size='$4xl' span>
          {cents}
        </Text>
      </Row>
    </Wrapper>
  );
};
