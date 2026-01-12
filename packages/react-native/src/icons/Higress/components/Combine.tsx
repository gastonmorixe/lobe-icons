import React, { memo } from 'react';

import { RNIconCombineProps } from '../../../../../../src/features';

import Mono from './Text';
import Color from './TextColor';

export interface CombineProps extends Omit<RNIconCombineProps, 'Icon' | 'Text'> {
  type?: 'color' | 'mono';
}
const Combine = memo<CombineProps>(({ type = 'mono', ...rest }) => {
  return type === 'color' ? <Color {...(rest as any)} /> : <Mono {...(rest as any)} />;
});

export default Combine;
