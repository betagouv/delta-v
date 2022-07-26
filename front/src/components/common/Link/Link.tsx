import React from 'react';

import classNames from 'classnames';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface LinkProps {
  back?: boolean;
  to?: string;
  href?: string;
  external?: boolean;
  underline?: boolean;
  children: React.ReactNode;
  tag?: 'div' | 'span';
}

export const Link: React.FC<LinkProps> = ({
  back,
  to,
  href,
  external = false,
  underline = false,
  children,
  tag,
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

  return (
    <>
      {(to || back) && (
        <CustomTag
          onClick={handleClick}
          className={classNames({ 'cursor-pointer': true, underline })}
        >
          {children}
        </CustomTag>
      )}
      {href && (
        <NextLink href={href}>
          <a target={external ? '_blank' : '_self'}>{children}</a>
        </NextLink>
      )}
    </>
  );
};
