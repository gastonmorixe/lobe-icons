import { memo } from 'react';

import { Tag, TagProps } from '../../utils/ui-components';

import ModelIcon from '../ModelIcon';

export interface ModelTagProps extends Omit<TagProps, 'icon' | 'children'> {
  model: string;
  type?: 'color' | 'mono';
}
const ModelTag = memo<ModelTagProps>(({ type = 'mono', model, ...rest }) => (
  <Tag icon={<ModelIcon model={model} type={type} />} {...rest}>
    {model}
  </Tag>
));

ModelTag.displayName = 'ModelTag';

export default ModelTag;
