import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Map from "./Map";

export default function App() {
  return (
    <MantineProvider>
      <Map />
    </MantineProvider>
  );
}
