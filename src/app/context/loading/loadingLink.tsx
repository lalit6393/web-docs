"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, use, useTransition } from "react";

export const DELAY = 400;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
const noop = () => { };

type TransitionContext = {
  pending: boolean;
  navigate: (url?: string) => void;
};
const Context = createContext<TransitionContext>({
  pending: false,
  navigate: noop,
});
export const useNavigationTransition = () => use(Context);

export default function Transitions({ children }: PropsWithChildren) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const navigate = (href?: string) => {
    start(async () => {
      if (href) {
        router.push(href);
      } else {
        router.back();
      }
      await sleep(DELAY);
    });
  };


  return (
    <Context.Provider value={{ pending, navigate }}>
      {children}
    </Context.Provider>
  );
}