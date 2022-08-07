import { useEffect, useLayoutEffect, useState } from "react";

const useHydrated = (beforePaint = true) => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  const isServer = typeof window === "undefined";
  const useEffectFn = beforePaint && !isServer ? useLayoutEffect : useEffect;

  useEffectFn(() => {
    setHasHydrated(true);
  });

  return hasHydrated;
};

export default useHydrated;
