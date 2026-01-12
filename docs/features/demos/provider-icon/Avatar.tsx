import { ModelProvider, ProviderIcon } from '@lobehub/icons';
import { Flexbox } from '../../../../src/utils/ui-components';

export default () => {
  return (
    <Flexbox gap={16} horizontal width={'100%'} wrap={'wrap'}>
      {Object.values(ModelProvider).map((provider) => (
        <ProviderIcon key={provider} provider={provider} size={48} type={'avatar'} />
      ))}
    </Flexbox>
  );
};
