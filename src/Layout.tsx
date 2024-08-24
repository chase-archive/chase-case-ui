import Map from './Map';
import { CasesMapDisplay } from './mapDisplay';
import { QueryCases } from './query';

export default function Layout() {
  return (
    <>
      <Map>
        <CasesMapDisplay />
      </Map>
      <QueryCases />
    </>
  );
}
