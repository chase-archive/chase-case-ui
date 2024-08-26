import { Anchor, Text } from '@mantine/core';
import { isTwitterLink, isYouTubeLink } from '../utils/socials';
import { Fragment, PropsWithChildren } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

export function LinkList({
  links,
  onClickSocialLink,
}: {
  links: string[];
  onClickSocialLink: (link: string) => void;
}) {
  return (
    <>
      {links.length === 0 && <Text size='sm'>N/A</Text>}
      {links.map((link, idx) => (
        <Fragment key={idx}>
          <Link link={link} onClickSocialLink={onClickSocialLink}>
            {idx + 1} <FaExternalLinkAlt />
          </Link>
          {idx < links.length - 1 && (
            <Text size='sm' mr={8}>
              ,
            </Text>
          )}
        </Fragment>
      ))}
    </>
  );
}

export function Link({
  link,
  onClickSocialLink,
  children,
}: {
  link: string;
  onClickSocialLink: (link: string) => void;
} & PropsWithChildren) {
  let linkProps = {};
  if (isYouTubeLink(link) || isTwitterLink(link)) {
    linkProps = {
      onClick: () => onClickSocialLink(link),
    };
  } else {
    linkProps = {
      href: link,
      target: '_blank',
    };
  }
  return (
    <Anchor {...linkProps} size='sm' underline='hover'>
      {children}
    </Anchor>
  );
}
