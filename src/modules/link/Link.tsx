"use client";

import React from 'react'
import NextLink from "next/link";
import { ComponentProps } from "react";
import { usePathname } from "next/navigation";
import { useNavigationTransition } from '@/app/context/loading/loadingLink';

type Props = ComponentProps<typeof NextLink>;

const Link = (props: Props) => {
  
  const routePath = usePathname();
  const { navigate } = useNavigationTransition();

  return (
    <NextLink
      {...props}
      onClick={(e) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href");
        if (href === routePath) return;
        if (href) navigate(href);
      }}
    />
  );
};

export default Link;