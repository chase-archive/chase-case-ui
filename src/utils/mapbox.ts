import _ from 'lodash';

export function rgb(r: number, g: number, b: number) {
  return `rgb(${r},${g},${b})`;
}

export function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

export function scale<T>(values: T[], min = 0, max = 1) {
  const step = (max - min) / (values.length - 1);

  return _.range(min, max + step, step)
    .map((val, idx) => [val, values[idx]])
    .reduce((acc, cur) => [...acc, ...cur], []);
}

export function assoc<K, V>(keys: K[], values: V[]) {
  return _.zip(keys, values)
    .reduce<(K | V | undefined)[]>((acc, cur) => [...acc, ...cur], [])
    .filter((v) => v !== undefined);
}

export function transition(mapZooms: number[], values: number[]) {
  return ['interpolate', ['linear'], ['zoom'], ...assoc(mapZooms, values)];
}

export function transitionIn(fromZoom: number, toZoom: number) {
  return transition([fromZoom, toZoom], [0, 1]);
}

export function transitionOut(fromZoom: number, toZoom: number) {
  return transition([fromZoom, toZoom], [1, 0]);
}
