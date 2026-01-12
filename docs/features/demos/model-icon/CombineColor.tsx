import { ModelIcon, modelMappings } from '@lobehub/icons';
import { Grid } from '../../../../src/utils/ui-components';

export default () => {
  return (
    <Grid gap={16} rows={2} width={'100%'}>
      {Object.values(modelMappings).map((item) => {
        const model = item.keywords[0].replace('^', '');
        return <ModelIcon key={model} model={model} size={28} type={'combine-color'} />;
      })}
    </Grid>
  );
};
