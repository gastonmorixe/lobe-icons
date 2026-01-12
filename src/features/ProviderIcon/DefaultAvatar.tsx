import { memo } from 'react';

import { Center } from '../../utils/ui-components';

import type { IconAvatarProps } from '../IconAvatar';
import DefaultIcon from './DefaultIcon';

const DefaultAvatar = memo<Omit<IconAvatarProps, 'Icon'>>(
  ({
    shape = 'circle',
    color,
    background,
    size,
    style,
    iconMultiple = 0.6,
    iconStyle,
    iconClassName,
  }) => {
    return (
      <Center
        flex={'none'}
        style={{
          background: background || 'var(--ant-color-fill-secondary, rgba(0, 0, 0, 0.06))',
          borderRadius: shape === 'circle' ? '50%' : Math.floor(size * 0.1),
          color,
          height: size,
          width: size,
          ...style,
        }}
      >
        <DefaultIcon
          className={iconClassName}
          color={color}
          size={size * iconMultiple}
          style={iconStyle}
        />
      </Center>
    );
  },
);

export default DefaultAvatar;
