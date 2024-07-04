import React from "react";

export function useClickOutside(cb: any) {
  const ref = React.useRef<any>(null);
  const refCb = React.useRef<any>(cb);

  React.useLayoutEffect(() => {
    refCb.current = cb;
  });

  React.useEffect(() => {
    const handler = (e: any) => {
      const element = ref.current;
      if (element && !element.contains(e.target)) {
        refCb.current(e);
      }
    };

    document.addEventListener("mouseup", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mouseup", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return ref;
}
