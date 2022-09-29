import type { NextPage } from 'next';

import { BaseInput, BaseInputPassword, BaseScene } from '@/components/base';

const UserPage: NextPage = () => (
  <BaseScene>
    <form onSubmit={() => {}}>
      <BaseInput css={{ display: 'block' }} labelPlaceholder='Email' />
      <BaseInputPassword
        css={{ display: 'block' }}
        labelPlaceholder='Password'
      />
    </form>
  </BaseScene>
);

export default UserPage;
