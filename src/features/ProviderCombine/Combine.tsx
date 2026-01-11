import { ReactNode, memo } from 'react';

import { DivProps, Flexbox } from '@/utils/ui-components';
import { Divider } from '@/utils/antd-components';

const Combine = memo<DivProps & { left: ReactNode; right: ReactNode; size: number }>(
  ({ left, right, size = 24, ...rest }) => {
    return (
      <Flexbox align={'center'} flex={'none'} gap={size / 3} horizontal {...rest}>
        {left}
        <Divider style={{ marginBlock: 0, marginInline: size / 6 }} type={'vertical'} />
        {right}
      </Flexbox>
    );
  },
);

export default Combine;
