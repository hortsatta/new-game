import { Input, styled } from '@nextui-org/react';

const baseInputCss = {
  'input::placeholder': {
    color: 'rgba(255,255,255,0.5)',
  },
  '> .nextui-input-wrapper:not(.nextui-input-wrapper--underlined):not(.nextui-input-wrapper--bordered)':
    { bg: 'rgba(255,255,255,0.1)' },
  '.nextui-input-content--left': {
    w: '22px',
    pl: '$8',
    pr: '$2',
    opacity: 0.6,
  },
};

const BaseInput: any = styled(Input, baseInputCss);

export { baseInputCss };
export default BaseInput;
