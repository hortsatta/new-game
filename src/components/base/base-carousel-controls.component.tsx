import { useMemo } from 'react';
import { Image, keyframes, styled } from '@nextui-org/react';
import { CarouselItem, CarouselType } from '@/types/carousel.type';

type Props = {
  items: CarouselItem[];
  currentIndex: number;
  autoplaySpeed?: number;
  autoplayTimeMs?: number;
  onThumbnailPress?: (index: number) => void;
};

const DURATION_WIDTH = 360;

const glitterAnimation = keyframes({
  '0%': {
    transform: 'scale(0.9)',
    opacity: 0.9,
  },
  '25%': {
    transform: 'scale(1)',
    opacity: 0.7,
  },
  '50%': {
    transform: 'scale(0.8)',
    opacity: 0.9,
  },
  '75%': {
    transform: 'scale(1)',
    opacity: 0.8,
  },
  '100%': {
    transform: 'scale(0.9)',
    opacity: 0.9,
  },
});

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginInline: 'auto',
  mb: '10px',
  p: '54px 0',
  maxW: '400px',
  w: '100%',
});

const ThumbnailButton = styled('button', {
  all: 'unset',
  position: 'relative',
  marginInline: '10px',
  w: '75px',
  h: '56px',
  bg: '$background',
  borderRadius: '12px',
  cursor: 'pointer',
  overflow: 'hidden',
  boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
  '&:hover': {
    '> div:first-child': {
      bgColor: 'rgba(255,255,255,0.12)',
      opacity: 1,
    },
  },
});

const Indicator = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  w: '100%',
  h: '100%',
  bg: 'url(/images/carousel-thumbnail-indicator.svg)',
  opacity: 0,
  transition: 'all 0.26s ease',
  zIndex: 1,
});

const SlideDurationWrapper = styled('div', {
  mt: '20px',
  w: DURATION_WIDTH + 'px',
  h: '3px',
});

const SlideDuration = styled('div', {
  position: 'relative',
  w: '100%',
  h: '100%',
  linearGradient: '90deg, rgba(104,10,8,1) 0%, rgba(200,9,7,1) 100%',
  boxShadow: '0 1px 0 rgba(0,0,0,0.3), 0 0 8px #892020',
  transition: 'width 1s linear',
  '&:after': {
    content: '',
    position: 'absolute',
    top: '-26px',
    right: '-35px',
    w: '70px',
    h: '53px',
    bg: 'url(/images/carousel-thumbnail-indicator-tip.png)',
    animation: `${glitterAnimation} 0.6s infinite`,
  },
});

const BaseCarouselControls = ({
  items,
  currentIndex,
  autoplaySpeed,
  autoplayTimeMs,
  onThumbnailPress,
  ...moreProps
}: Props) => {
  const slideDurationCss = useMemo(() => {
    if (!autoplaySpeed || !autoplayTimeMs) {
      return {};
    }
    const speed = autoplaySpeed - 1000;
    const currentLeft = (speed - autoplayTimeMs) / speed;
    const width = (currentLeft * DURATION_WIDTH).toFixed(0).toString() + 'px';
    return { width };
  }, [autoplaySpeed, autoplayTimeMs]);

  return (
    <Wrapper {...moreProps}>
      <div>
        {items.map(({ index, type, content }) => (
          <ThumbnailButton
            key={index}
            aria-label={`go to slide ${index}`}
            onClick={() => onThumbnailPress && onThumbnailPress(index || 0)}
          >
            <Indicator css={{ opacity: index === currentIndex ? 1 : 0 }} />
            <Image
              src={
                type === CarouselType.IMAGE
                  ? content.url
                  : content.background_image
              }
              alt=''
              objectFit='cover'
              containerCss={{
                w: '100%',
                h: '100%',
                borderRadius: '12px',
                filter: `saturate(${index === currentIndex ? 1 : 0.6})`,
                transition: 'all 0.26s ease',
              }}
            />
          </ThumbnailButton>
        ))}
      </div>
      <SlideDurationWrapper>
        <SlideDuration css={slideDurationCss} />
      </SlideDurationWrapper>
    </Wrapper>
  );
};

export default BaseCarouselControls;
