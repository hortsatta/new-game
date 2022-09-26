import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Container, CSS, styled } from '@nextui-org/react';
import { useStopwatch } from 'react-timer-hook';

import BaseCarouselControls from './base-carousel-controls.component';
import BaseCarouselItem from './base-carousel-item.component';
import type { CarouselItem } from '@/types/carousel.type';

type Props = {
  items: CarouselItem[];
  ratio?: number;
  maxWidth?: any;
  autoplay?: boolean;
  autoplaySpeed?: number;
  css?: CSS;
};

const getNumber = (val: string) => Number(val.replace(/[^0-9.]/g, ''));
const offsetItemLength = 2;

const Outer = styled('div', {
  pt: '10px',
  pb: '$8',
  position: 'relative',
  w: '100%',
  ov: 'hidden',
});

const Inner = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  transition: 'transform 1s ease',
});

const BaseCarousel = ({
  items,
  ratio = 10 / 16,
  maxWidth = 'unset',
  autoplay = true,
  autoplaySpeed = 6000,
  ...moreProps
}: Props) => {
  const ref = useRef<any>(null);
  const itemRef = useRef<any>(null);
  const {
    seconds: autoplaySeconds,
    isRunning: isAutoplayRunning,
    ...autoplayActions
  } = useStopwatch({ autoStart: false });
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [itemSize, setItemSize] = useState({ width: 0, offset: 0 });
  const [hasTransition, setHasTransition] = useState(true);

  useEffect(() => {
    // Get and set carousel item size and offset base on parent width
    const carouselStyles = window.getComputedStyle(ref.current);
    const itemStyles = window.getComputedStyle(itemRef.current);
    const carouselItemWidth =
      getNumber(itemStyles.width) +
      getNumber(itemStyles.marginLeft) +
      getNumber(itemStyles.marginRight);
    const offset = (getNumber(carouselStyles.width) - carouselItemWidth) / 2;
    setItemSize({ width: carouselItemWidth, offset });

    // Initialise autoplay if true
    if (!autoplay) {
      return;
    }
    autoplayActions.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainItems = useMemo(
    () => items.map((item, index) => ({ ...item, index })),
    [items]
  );

  // Check current index and adjust value if outside of item count
  useEffect(() => {
    if (currentIndex >= mainItems.length) {
      setCurrentIndex(() => {
        setHasTransition(true);
        return mainItems.length - 1;
      });
    }

    if (currentIndex < 0) {
      setCurrentIndex(() => {
        setHasTransition(true);
        return 0;
      });
    }
  }, [currentIndex, mainItems]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(() => {
        if (index >= mainItems.length) {
          setHasTransition(false);
          return -1;
        }

        if (index < 0) {
          setHasTransition(false);
          return mainItems.length;
        }

        setHasTransition(true);
        return index;
      });
    },
    [mainItems]
  );

  useEffect(() => {
    console.log(autoplaySeconds);
    if (autoplaySeconds * 1000 < autoplaySpeed) {
      return;
    }
    autoplayActions.reset();
    goToSlide(currentIndex + 1);
  }, [
    currentIndex,
    autoplaySeconds,
    autoplaySpeed,
    autoplayActions,
    goToSlide,
  ]);

  const offsetLength = useMemo(() => {
    const length = mainItems.length - 1;
    return length >= offsetItemLength ? offsetItemLength : length;
  }, [mainItems]);

  // Clone items to append and prepend on main items for infinite loop
  const carouselItems = useMemo(() => {
    const beforeItems = [...mainItems].splice(
      mainItems.length - 1 - offsetLength,
      offsetLength
    );
    const afterItems = [...mainItems].splice(0, offsetLength);

    return [
      ...beforeItems.map((item, i) => ({
        ...item,
        index: -(beforeItems.length - i),
      })),
      ...mainItems,
      ...afterItems.map((item, i) => ({
        ...item,
        index: mainItems.length + i,
      })),
    ];
  }, [offsetLength, mainItems]);

  // Styles for moving the slides base on current index
  const innerCss = useMemo(() => {
    const x = itemSize.width * (currentIndex + offsetLength) - itemSize.offset;
    const transition = !hasTransition ? { transition: 'none' } : {};
    return { transform: `translateX(-${x}px)`, ...transition };
  }, [itemSize, offsetLength, currentIndex, hasTransition]);

  const handleThumbnailPress = useCallback(
    (index: number) => {
      autoplay && autoplayActions.reset();
      goToSlide(index);
    },
    [autoplay, autoplayActions, goToSlide]
  );

  const handleCarouselMouseEnter = useCallback(() => {
    if (!autoplay || !isAutoplayRunning) {
      return;
    }
    autoplayActions.pause();
  }, [autoplay, isAutoplayRunning, autoplayActions]);

  const handleCarouselMouseLeave = useCallback(() => {
    if (!autoplay || isAutoplayRunning) {
      return;
    }
    autoplayActions.start();
  }, [autoplay, isAutoplayRunning, autoplayActions]);

  return (
    <Container fluid {...moreProps}>
      <BaseCarouselControls
        items={mainItems}
        currentIndex={currentIndex}
        autoplaySpeed={autoplaySpeed}
        autoplayTimeMs={autoplaySeconds * 1000}
        onThumbnailPress={handleThumbnailPress}
      />
      <Outer ref={ref}>
        <Inner css={innerCss}>
          {carouselItems.map((item) => (
            <BaseCarouselItem
              {...(item.index === 0 && { ref: itemRef })}
              key={item.index}
              item={item}
              ratio={ratio}
              maxWidth={maxWidth}
              {...(item.index === currentIndex && {
                onMouseEnter: handleCarouselMouseEnter,
                onMouseLeave: handleCarouselMouseLeave,
              })}
            />
          ))}
        </Inner>
      </Outer>
    </Container>
  );
};

export default BaseCarousel;
