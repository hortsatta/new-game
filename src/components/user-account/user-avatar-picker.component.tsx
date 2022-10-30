import { useCallback, useState } from 'react';
import { Image, Row } from '@nextui-org/react';
import { Controller, Noop, useFormContext } from 'react-hook-form';

import UserAvatarUpload from './user-avatar-upload.component';
import type { UserAvatar } from '@/types/user-account.type';

type Props = {
  userAvatars: UserAvatar[];
  defaultSelectedIndex?: number;
  onChange?: (id: number) => void;
  onBlur?: Noop;
};

const selectedCss = {
  borderColor: '$primaryBorderHover',
  boxShadow: '0 4px 10px 0 rgba(225,0,0,0.4)',
};

const css = {
  w: '100px',
  h: '100px',
  m: 0,
  flexShrink: 0,
  border: '1px solid transparent',
  borderRadius: '$xs',
  bgColor: '$accents0',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: '0.12s ease',
  '&:hover': selectedCss,
};

const UserAvatarPicker = ({
  userAvatars,
  defaultSelectedIndex,
  onChange,
  onBlur,
}: Props) => {
  const { control, setValue } = useFormContext();
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    defaultSelectedIndex
  );

  const handleSelect = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      onChange && onChange(Number(userAvatars[index].id));
      onBlur && onBlur();
    },
    [userAvatars, onChange, onBlur]
  );

  const handleAvatarUploadChange = (
    value: any,
    onChange: (...event: any[]) => void
  ) => {
    onChange(value);
    setValue('avatarType', 0);
    setSelectedIndex(userAvatars.length);
  };

  return (
    <Row
      css={{
        justifyContent: 'space-between',
        alignContent: 'space-between',
        flexWrap: 'wrap',
        minHeight: '218px',
      }}
    >
      {userAvatars.map(({ id, imageUrl }, index) => (
        <Image
          key={id}
          containerCss={{
            ...css,
            ...(selectedIndex === index && selectedCss),
          }}
          src={imageUrl}
          alt={`avatar ${id}`}
          onClick={() => handleSelect(index)}
        />
      ))}
      <Controller
        name='avatarImage'
        control={control}
        render={({ field: { value, onChange } }) => (
          <UserAvatarUpload
            css={{
              ...css,
              ...(selectedIndex === userAvatars.length && selectedCss),
            }}
            value={value}
            onChange={(value) => handleAvatarUploadChange(value, onChange)}
          />
        )}
      />
    </Row>
  );
};

export default UserAvatarPicker;
