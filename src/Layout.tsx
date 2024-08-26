import Map from './Map';
import { CasesDetails } from './details';
import { CasesMapDisplay } from './mapDisplay';
import { QueryCases } from './query';

export default function Layout() {
  return (
    <>
      <Map>
        <CasesMapDisplay />
        <CasesDetails />
        <QueryCases />
      </Map>
    </>
  );
}
