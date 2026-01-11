'use client';

import { memo } from 'react';

import { ActionIcon, ActionIconSize, DivProps } from '@/utils/ui-components';
import { Download } from 'lucide-react';

export interface DownloadButtonProps extends DivProps {
  className?: string;
  onClick?: () => void;
  size?: ActionIconSize;
}

const DownloadButton = memo<DownloadButtonProps>(({ className, onClick, ...rest }) => {
  return (
    <ActionIcon
      {...rest}
      className={className}
      glass
      icon={Download}
      onClick={onClick}
      title={'Download'}
    />
  );
});

export default DownloadButton;
