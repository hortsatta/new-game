import { ReactNode, useEffect, useMemo, useRef } from 'react';
import NextLink from 'next/link';
import { Link, LinkProps } from '@nextui-org/react';

type Props = LinkProps & {
  href: string;
  active?: boolean;
  children?: ReactNode;
  onActive?: (pos: number) => void;
};

const initialLinkCss = {
  d: 'flex',
  justifyContent: 'center',
  px: '10px',
  w: '100%',
  h: '74px',
  maxW: 'unset',
  color: '$white',
  opacity: 0.7,
  transform: 'scale(1)',
  '&:hover': {
    opacity: 1,
  },
  '&:active': {
    transform: 'scale(0.76)',
  },
  '&:not(:active)': {
    transition: 'all 260ms ease',
  },
};

export const BaseNavLink = ({
  href,
  active,
  children,
  onActive,
  onPress,
  ...moreProps
}: Props) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!active) {
      return;
    }
    onActive && onActive(ref.current.offsetTop);
  }, [active, onActive]);

  const linkProps = useMemo(() => {
    if (active) {
      return { ...initialLinkCss, opacity: 1 };
    }

    return initialLinkCss;
  }, [active]);

  return (
    <NextLink href={href} passHref>
      <Link ref={ref} css={linkProps} {...moreProps}>
        {children}
      </Link>
    </NextLink>
  );
};
