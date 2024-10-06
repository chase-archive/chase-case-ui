import { Barbs, FilledContours, LineContour } from '../plots';
import { isotachs } from '../plots/cmaps';
import { DisplayVar } from '../types';
import { layers } from '../layers';
import { Colormap } from '../plots/types';
import { useEnvironmentLayerDefs } from './hooks';
import { useChaseCaseStore } from '../store';

interface RenderDisplayProps {
  layerId: string;
  cmap?: Colormap;
  displayVar: DisplayVar;
  hide?: boolean;
}

function RenderLayer({ layerId, cmap, displayVar, hide }: RenderDisplayProps) {
  if (displayVar === 'barbs') {
    return (
      <Barbs id={layerId} beforeId={layers.queriedCasesHeatmap} hide={hide} />
    );
  }
  if (displayVar === 'isotachs') {
    if (!cmap) {
      return null;
    }
    return (
      <FilledContours
        id={layerId}
        cmap={cmap}
        beforeId={layers.queriedCasesHeatmap}
        hide={hide}
      />
    );
  }
  if (displayVar === 'height') {
    return (
      <LineContour
        id={layerId}
        beforeId={layers.queriedCasesHeatmap}
        hide={hide}
        labels={false}
      />
    );
  }
}

export default function EnvironmentLayers() {
  const layerDefs = useEnvironmentLayerDefs();
  const environmentTimeIndex = useChaseCaseStore(
    (state) => state.environmentTimeIndex
  );

  return (
    <>
      {layerDefs.map((layerDef) => {
        const { id, displayVar, level, timeIndex } = layerDef;
        const cmap = displayVar === 'isotachs' ? isotachs[level] : undefined;
        return (
          <RenderLayer
            key={id}
            layerId={id}
            cmap={cmap ?? undefined}
            displayVar={displayVar}
            hide={timeIndex !== environmentTimeIndex}
          />
        );
      })}
    </>
  );
}
