import { Image, styled } from '@nextui-org/react';
import { forwardRef } from 'react';

import { CarouselItem, CarouselType } from '@/types/carousel.type';

type Props = {
  item: CarouselItem;
  ratio: number;
  maxWidth: any;
};

const Outer = styled('div', {
  mx: '45px',
  position: 'relative',
  width: '100%',
  flexShrink: 0,
  borderRadius: '24px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  ov: 'hidden',
  '&:before': {
    content: '',
    display: 'block',
    width: '100%',
  },
});

const Inner = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const BaseCarouselItem = forwardRef(
  ({ item, ratio, maxWidth, ...moreProps }: Props, ref: any) => {
    const { index, type, content } = item;

    return (
      <Outer
        ref={ref}
        css={{
          maxWidth,
          '&:before': {
            pt: `calc((${ratio}) * 100%)`,
          },
        }}
        {...moreProps}
      >
        <Inner>
          <Image
            src={
              type === CarouselType.IMAGE
                ? content.url
                : content.background_image
            }
            alt=''
            containerCss={{
              w: '100%',
              h: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            objectFit='cover'
          />
        </Inner>
      </Outer>
    );
  }
) as any;

BaseCarouselItem.displayName = 'BaseCarouselItem';

export default BaseCarouselItem;
