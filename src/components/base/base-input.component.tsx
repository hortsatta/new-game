import { Input, styled } from '@nextui-org/react';

const baseInputCss = {
  '.nextui-input-content--left': {
    w: '22px',
    pl: '$8',
    pr: '$2',
    opacity: 0.6,
  },
};

const BaseInput: any = styled(Input, baseInputCss);

export { baseInputCss, BaseInput };
