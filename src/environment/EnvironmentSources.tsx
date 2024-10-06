import { GeojsonSource } from '../plots';
import { useEnvironmentLayerDefs } from './hooks';

export default function EnvironmentSources() {
  const layerDefs = useEnvironmentLayerDefs();
  return (
    <>
      {layerDefs.map((layerDef) => {
        const { id, data } = layerDef;
        return <GeojsonSource key={id} id={id} data={data} />;
      })}
    </>
  );
}
