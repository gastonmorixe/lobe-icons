import { ModelProvider, ProviderCombine } from '@lobehub/icons';
import { Flexbox } from '@/utils/ui-components';

export default () => {
  return (
    <Flexbox gap={16} width={'100%'} wrap={'wrap'}>
      {Object.values(ModelProvider).map((provider) => (
        <ProviderCombine id={provider} key={provider} provider={provider} size={24} type={'mono'} />
      ))}
    </Flexbox>
  );
};
