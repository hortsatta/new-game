import { useMemo } from 'react';
import Image from 'next/image';
import { styled } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';

import type { CarouselItem } from '@/types/carousel.type';

type Props = {
  currentIndex: number;
  carouselItems: CarouselItem[];
};

const Wrapper = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  w: '100%',
  h: '103%',
  zIndex: 0,
  ov: 'hidden',
  '&::before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    w: '100%',
    h: '100%',
    background: 'radial-gradient(circle, rgba(255,255,255,0) 0%, #181818 80%)',
    zIndex: 1,
  },
  '&::after': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    w: '100%',
    h: '100%',
    linearGradient: '0deg, #181818 0%, rgba(255,255,255,0) 30%',
    zIndex: 1,
  },
});

const NextImage = styled(Image, {
  position: 'relative',
  w: '100%',
  h: '100%',
  filter: 'blur(9px) saturate(0.75)',
});

export const CarouselImageBackdrop = ({
  currentIndex,
  carouselItems,
}: Props) => {
  const currentImgSrc = useMemo(() => {
    const currentItem = carouselItems.find((ci) => ci.index === currentIndex);

    if (!currentItem) {
      return null;
    }

    return currentItem.content.type === 'image'
      ? currentItem.content.image.url
      : currentItem.content.gameProduct.imageUrl ||
          currentItem.content.gameProduct.games[0].bgImage;
  }, [carouselItems, currentIndex]);

  return (
    <Wrapper>
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <NextImage
            src={currentImgSrc || ''}
            alt=''
            quality={40}
            objectFit='cover'
            layout='fill'
            priority
          />
        </motion.div>
      </AnimatePresence>
    </Wrapper>
  );
};
