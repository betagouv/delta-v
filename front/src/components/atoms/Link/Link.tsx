import React from 'react';

import classNames from 'classnames';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface LinkProps {
  back?: boolean;
  to?: string;
  href?: string;
  onClick?: () => any;
  external?: boolean;
  underline?: boolean;
  children: React.ReactNode;
  withBorder?: boolean;
  tag?: 'div' | 'span';
}

enum LinkType {
  to,
  href,
  onClick,
  default,
}

const getLinkType = (to?: string, back?: boolean, href?: string, onClick?: () => any): LinkType => {
  if (to || back) {
    return LinkType.to;
  }
  if (href) {
    return LinkType.href;
  }
  if (onClick) {
    return LinkType.onClick;
  }

  return LinkType.default;
};

export const Link: React.FC<LinkProps> = ({
  back,
  to,
  href,
  onClick,
  external = false,
  underline = false,
  children,
  tag,
  withBorder = false,
}: LinkProps) => {
  const router = useRouter();
  const handleClick = () => {
    if (back) {
      router.back();
    }
    if (to) {
      router.push(to);
    }
  };
  const CustomTag = tag ?? 'div';

  const linkType = getLinkType(to, back, href, onClick);

  return (
    <CustomTag
      className={classNames({
        'rounded-md border border-black p-2': withBorder,
      })}
    >
      {linkType === LinkType.to && (to || back) && (
        <CustomTag
          onClick={handleClick}
          className={classNames({ 'cursor-pointer': true, underline })}
        >
          {children}
        </CustomTag>
      )}
      {linkType === LinkType.href && href && (
        <NextLink
          href={href}
          target={external ? '_blank' : '_self'}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
        </NextLink>
      )}
      {linkType === LinkType.onClick && onClick && (
        <div className="cursor-pointer" onClick={onClick}>
          {children}
        </div>
      )}
    </CustomTag>
  );
};
