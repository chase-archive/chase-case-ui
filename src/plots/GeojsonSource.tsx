import { FeatureCollection } from 'geojson';
import { Source } from 'react-map-gl';

export default function GeojsonSource({
  id,
  data,
}: {
  id: string;
  data: FeatureCollection;
}) {
  return <Source id={id} type='geojson' data={data} />;
}
