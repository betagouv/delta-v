import React from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface LinkProps {
  back?: boolean;
  to?: string;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({
  back,
  to,
  href,
  external = false,
  children,
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

  return (
    <>
      {(to || back) && (
        <div onClick={handleClick} className="cursor-pointer">
          {children}
        </div>
      )}
      {href && (
        <NextLink href={href}>
          <a target={external ? '_blank' : '_self'}>{children}</a>
        </NextLink>
      )}
    </>
  );
};
