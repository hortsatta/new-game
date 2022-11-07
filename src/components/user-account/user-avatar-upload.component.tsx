import { CSS, Image, styled, Text } from '@nextui-org/react';
import { PlusCircle } from 'phosphor-react';
import ImageUploading, {
  ImageUploadingPropsType,
} from 'react-images-uploading';

type Props = ImageUploadingPropsType & {
  css?: CSS;
};

const Wrapper = styled('div');
const Center = styled('div', {
  w: '100%',
  h: '100%',
  d: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const ImageUpload = ({ isDragging, ...moreProps }: { isDragging: boolean }) => (
  <Center {...moreProps}>
    <PlusCircle opacity={0.5} size={32} />
    <Text
      css={{
        mt: '$4',
        fontSize: '$xs',
        textTransform: 'uppercase',
        opacity: 0.5,
      }}
      span
    >
      browse
    </Text>
  </Center>
);

export const UserAvatarUpload = ({ css, ...moreProps }: Props) => {
  return (
    <ImageUploading {...moreProps} dataURLKey='data_url'>
      {({ imageList, onImageUpload, isDragging, dragProps }) => (
        <Wrapper css={css} onClick={onImageUpload}>
          {!imageList.length ? (
            <ImageUpload isDragging={isDragging} {...dragProps} />
          ) : (
            <Image
              containerCss={{ w: '100%', h: '100%' }}
              src={imageList[0]['data_url']}
              alt='your artwork'
              objectFit='cover'
            />
          )}
        </Wrapper>
      )}
    </ImageUploading>
  );
};
