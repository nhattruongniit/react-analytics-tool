import React from "react";

type IProps = {
  querySidebarRef: React.RefObject<HTMLDivElement>;
  resizerHandlerRef: React.RefObject<HTMLDivElement>;
  isOpen?: boolean;
};

export const useResizeQuerySidebar = ({ querySidebarRef, resizerHandlerRef, isOpen = false }: IProps) => {
  // reset width when close sidebar
  React.useLayoutEffect(() => {
    if (!isOpen && querySidebarRef.current) {
      querySidebarRef.current.style.width = "50px";
    }
  }, [isOpen, querySidebarRef]);

  const onHorizontalResize = React.useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      let onMouseMove: any = (mouseEvent: MouseEvent) => {
        if (mouseEvent.buttons === 0) return;
        let posX = mouseEvent.clientX;
        if (posX < 375) {
          posX = 375;
        }
        const fromRight = window.innerWidth - posX;
        if (fromRight < 375) {
          posX = window.innerWidth - 375;
        }

        querySidebarRef.current!.style.width = `${fromRight}px`;
      };

      let onMouseUp: any = () => {
        if (!querySidebarRef.current) return;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        onMouseMove = null;
        onMouseUp = null;
        querySidebarRef.current.classList.remove("pointer-events-none");
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [querySidebarRef],
  );

  React.useLayoutEffect(() => {
    const currentRef = resizerHandlerRef.current;
    currentRef?.addEventListener("mousedown", onHorizontalResize);
    return () => {
      currentRef?.removeEventListener("mousedown", onHorizontalResize);
    };
  }, [resizerHandlerRef, onHorizontalResize]);
};
