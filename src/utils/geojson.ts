import { HasLocation } from '../types';
import { FeatureCollection, Feature } from 'geojson';

export default function toGeojson<T extends HasLocation>(
  coordinateArray: T[]
): FeatureCollection {
  return {
    type: 'FeatureCollection',
    // crs: {
    //   type: 'name',
    //   properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
    // },
    features: coordinateArray.map((entry) => toGeojsonEntry(entry)),
  };
}

function toGeojsonEntry(jsonEntry: HasLocation): Feature {
  const latitude = jsonEntry.lat;
  const longitude = jsonEntry.lon;

  return {
    type: 'Feature',
    properties: {
      ...jsonEntry,
    },
    geometry: {
      type: 'Point',
      coordinates: [longitude, latitude],
    },
  };
}
