import BaseInput from './base-input.component';
import { Binoculars } from 'phosphor-react';

const BaseSearch = () => (
  <div>
    <BaseInput
      aria-label='search'
      css={{ minWidth: '315px' }}
      placeholder='Search'
      contentLeft={<Binoculars width={22} height={22} weight='light' />}
      contentClickable
      clearable
    />
  </div>
);

export default BaseSearch;
