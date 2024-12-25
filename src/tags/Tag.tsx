import { Flex, Text } from '@mantine/core';
import TornadoIcon from './tornado.svg';
import HailIcon from './hail.svg';
import WindIcon from './wind.svg';
import StructureIcon from './structure.svg';
import HurricaneIcon from './hurricane.svg';
import FloodIcon from './flood.svg';
import FireIcon from './fire.svg';
import SnowIcon from './snow.svg';
import LightningIcon from './lightning.svg';
import styles from './Tags.module.css';

type TagType = keyof typeof TAG_COLORS;

const TAG_COLORS = {
  tornado: 'rgba(255, 0, 0, 0.5)',
  hail: 'rgba(0, 128, 0, 0.5)',
  wind: 'rgba(31, 81, 255, 0.5)',
  structure: 'rgba(128, 0, 128, 0.5)',
  hurricane: 'rgba(255, 0, 255, 0.5)',
  flood: 'rgba(139, 69, 19, 0.5)',
  fire: 'rgba(255, 165, 0, 0.5)',
  snow: 'white',
  lightning: 'rgba(255, 234, 0, 0.5)',
};

const TAG_ICONS = {
  tornado: TornadoIcon,
  hail: HailIcon,
  wind: WindIcon,
  structure: StructureIcon,
  hurricane: HurricaneIcon,
  flood: FloodIcon,
  fire: FireIcon,
  snow: SnowIcon,
  lightning: LightningIcon,
};

interface EventTagProps {
  name: string;
  color?: string;
  img?: typeof TornadoIcon;
}

function toEventProps(name: string) {
  if (!Object.keys(TAG_COLORS).includes(name)) {
    if (['mothership', 'shelf'].includes(name)) {
      return { color: TAG_COLORS.structure, img: TAG_ICONS.structure };
    }
    if (name.includes('waterspout') || name.includes('landspout')) {
      return { color: TAG_COLORS.tornado, img: TAG_ICONS.tornado };
    }
    if (
      name.includes('wind') ||
      name.includes('bow echo') ||
      name.includes('derecho') ||
      name.includes('haboob') ||
      name.includes('dust')
    ) {
      return { color: TAG_COLORS.wind, img: TAG_ICONS.wind };
    }
    if (name.includes('fire')) {
      return { color: TAG_COLORS.fire, img: TAG_ICONS.fire };
    }
    if (name.includes('snow') || name.includes('ice')) {
      return { color: TAG_COLORS.snow, img: TAG_ICONS.snow };
    }
    return {
      color: undefined,
      img: undefined,
    };
  }
  return {
    color: TAG_COLORS[name as TagType],
    img: TAG_ICONS[name as TagType],
  };
}

export function Tag({ name }: Pick<EventTagProps, 'name'>) {
  return (
    <EventTag name={name.toLowerCase()} {...toEventProps(name.toLowerCase())} />
  );
}

export function EventTag({ name, color, img }: EventTagProps) {
  return (
    <Flex
      className={styles.tag}
      bg={color ?? 'rgba(211,211,211,0.5)'}
      direction='row'
      gap={5}
      align='center'
    >
      <Text size='xs' flex={1}>
        {name}
      </Text>
      {img && <img src={img} />}
    </Flex>
  );
}
