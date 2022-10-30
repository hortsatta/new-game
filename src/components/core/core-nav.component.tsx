import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Image, styled } from '@nextui-org/react';
import {
  Brain,
  FlyingSaucer,
  GameController,
  GearSix,
  Skull,
} from 'phosphor-react';
import type { IconWeight } from 'phosphor-react';

import { BaseNavLink } from '@/components/base';

const Nav = styled('nav', {
  position: 'relative',
  flex: 1,
  d: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  mt: '$10',
  w: '100%',
});

const Indicator = styled('div', {
  px: '10px',
  position: 'absolute',
  w: '100%',
  h: '74px',
  transform: 'scale(1) rotate(0deg)',
  transition: 'all 0.4s ease',
  zIndex: -1,
});

const List = styled('ul', { m: 0, p: 0 });
const ListItem = styled('li', { m: 0, p: 0 });

const mainNavItems = [
  { href: '/', label: 'Shop', Icon: GameController },
  { href: '/settings', label: 'Settings', Icon: GearSix },
];

const secondaryNavItems = [
  { href: '/cart', label: 'Cart', Icon: FlyingSaucer },
  { href: '/favorites', label: 'Favorites', Icon: Brain },
  { href: '/user', label: 'User', Icon: Skull },
];

const iconProps = {
  width: 26,
  height: 26,
  weight: 'light' as IconWeight,
};

const CoreNav = ({ ...moreProps }) => {
  const { asPath, isReady } = useRouter();
  const indicatorRef = useRef<any>(null);
  const [currentPathname, setCurrentPathname] = useState('/');
  const [indicatorPos, setIndicatorPos] = useState(0);
  const [activeIndicatorPos, setActiveIndicatorPos] = useState(0);
  const [isIndicatorMoving, setIsIndicatorMoving] = useState(false);

  const indicatorTransform = useMemo(() => {
    return isIndicatorMoving
      ? 'scale(0.75) rotate(-135deg)'
      : 'scale(1) rotate(0deg)';
  }, [isIndicatorMoving]);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (!isReady) {
      return;
    }
    setCurrentPathname(new URL(asPath, location.href).pathname);
  }, [asPath, isReady]);

  useEffect(() => {
    setIndicatorPos(activeIndicatorPos);
  }, [activeIndicatorPos]);

  const checkActivePath = useCallback(
    (href: string) => {
      const parentPath =
        '/' + (currentPathname.split('/').filter((p) => !!p.trim())[0] || '');
      return href === parentPath;
    },
    [currentPathname]
  );

  const handlePress = useCallback((event: any) => {
    setActiveIndicatorPos(event.target.offsetTop);
  }, []);

  const handleMouseEnter = useCallback((event: any) => {
    setIsIndicatorMoving(true);
    setIndicatorPos(event.target.offsetTop);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsIndicatorMoving(false);
    if (indicatorPos === activeIndicatorPos) {
      return;
    }
    setIndicatorPos(activeIndicatorPos);
  }, [indicatorPos, activeIndicatorPos]);

  return (
    <Nav {...moreProps}>
      <Indicator
        ref={indicatorRef}
        css={{
          top: indicatorPos,
          transform: indicatorTransform,
        }}
      >
        <Image
          src='/images/indicator.svg'
          alt='indicator'
          width='100%'
          height='100%'
        />
      </Indicator>
      <List>
        {mainNavItems.map(({ href, label, Icon }) => (
          <ListItem key={label}>
            <BaseNavLink
              aria-label={`navigate to ${label}`}
              href={href}
              active={checkActivePath(href)}
              onActive={setActiveIndicatorPos}
              onPress={handlePress}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Icon {...iconProps} />
            </BaseNavLink>
          </ListItem>
        ))}
      </List>
      <List>
        {secondaryNavItems.map(({ href, label, Icon }) => (
          <ListItem key={label}>
            <BaseNavLink
              aria-label={`navigate to ${label}`}
              href={href}
              active={checkActivePath(href)}
              onActive={setActiveIndicatorPos}
              onPress={handlePress}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Icon {...iconProps} />
            </BaseNavLink>
          </ListItem>
        ))}
      </List>
    </Nav>
  );
};

export default CoreNav;
