import { CloseButton, Flex, Text } from '@mantine/core';
import TornadoIcon from './icons/tornado.svg';
import HailIcon from './icons/hail.svg';
import WindIcon from './icons/wind.svg';
import StructureIcon from './icons/structure.svg';
import HurricaneIcon from './icons/hurricane.svg';
import FloodIcon from './icons/flood.svg';
import FireIcon from './icons/fire.svg';
import SnowIcon from './icons/snow.svg';
import LightningIcon from './icons/lightning.svg';
import styles from './Tags.module.css';
import { TagInteractionProps } from './types';
import { useHover } from '@mantine/hooks';
import { RefObject } from 'react';

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

interface EventTagProps extends TagInteractionProps {
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
      name === 'dust storm'
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

export function Tag({
  name,
  ...rest
}: Pick<EventTagProps, 'name'> & TagInteractionProps) {
  return (
    <EventTag
      name={name.toLowerCase()}
      {...toEventProps(name.toLowerCase())}
      {...rest}
    />
  );
}

export function EventTag({
  name,
  color,
  img,
  onTagClick,
  onTagClose,
}: EventTagProps) {
  const { hovered, ref } = useHover();
  return (
    <Flex
      ref={ref as RefObject<HTMLDivElement>}
      className={styles.tag}
      bg={color ?? 'rgba(211,211,211,0.5)'}
      direction='row'
      gap={5}
      align='center'
    >
      <Text
        size='xs'
        flex={1}
        onClick={() => {
          if (onTagClick) {
            onTagClick(name);
          }
        }}
        td={onTagClick && hovered ? 'underline' : 'none'}
        style={onTagClick && { ...{ cursor: 'pointer' } }}
      >
        {name}
      </Text>
      {img && <img src={img} />}
      {onTagClose && <CloseButton size='xs' onClick={() => onTagClose(name)} />}
    </Flex>
  );
}
