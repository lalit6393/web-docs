"use client";

import { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useNavigationTransition } from "@/app/context/loading/loadingLink";
import Loader from "../loader/Loader";

export default function Animate({ children }: PropsWithChildren) {
  const { pending } = useNavigationTransition();
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        {!pending && (
          <motion.div
            key={pathname}
            className="flex-1 overflow-hidden h-full w-full"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ ease: "circInOut", duration: 0.4 }}
          >
            {children}
          </motion.div>
        )}
        {
          pending &&
          <Loader/>
        }
      </AnimatePresence>
    </>
  );
}