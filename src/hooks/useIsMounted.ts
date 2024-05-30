import { useCallback, useEffect, useRef } from "react";

export function useIsMounted(): () => boolean {
  const isMounted = useRef(false);

  useEffect(() => {
    return () => {
      isMounted.current = true;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
