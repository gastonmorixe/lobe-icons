'use client';

import { HTMLAttributes, memo } from 'react';

import { ActionIcon, ActionIconSize } from '../../utils/ui-components';
import { Download } from 'lucide-react';

export interface DownloadButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
  size?: ActionIconSize;
}

const DownloadButton = memo<DownloadButtonProps>(({ className, onClick, size, ...rest }) => {
  return (
    <ActionIcon
      {...rest}
      className={className}
      glass
      icon={Download}
      onClick={onClick}
      size={size}
      title={'Download'}
    />
  );
});

export default DownloadButton;
