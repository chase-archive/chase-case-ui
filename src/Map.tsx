import MapGL from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function App() {
  return (
    <MapGL
      initialViewState={{
        longitude: -98.5556,
        latitude: 39.8097,
        zoom: 4,
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
      }}
      // onRender={(event) => event.target.resize()}
      minZoom={4}
      maxZoom={10}
      touchPitch={false}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    />
  );
}
