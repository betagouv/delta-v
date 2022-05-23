import React from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface LinkProps {
  to?: string;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, href, external = false, children }: LinkProps) => {
  const router = useRouter();

  return (
    <>
      {to && <div onClick={() => router.push(to)}>{children}</div>}
      {href && (
        <NextLink href={href}>
          <a target={external ? '_blank' : '_self'}>{children}</a>
        </NextLink>
      )}
    </>
  );
};
