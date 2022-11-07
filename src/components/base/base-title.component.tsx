import { CSS, Text } from '@nextui-org/react';
import type { ReactNode } from 'react';

type Props = {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  css?: CSS;
  children?: ReactNode;
};

export const BaseTitle = ({ css, children, ...moreProps }: Props) => (
  <Text
    css={{ ...{ fontSize: '18px', fontWeight: 500, opacity: 0.8 }, ...css }}
    h2
    {...moreProps}
  >
    {children}
  </Text>
);
