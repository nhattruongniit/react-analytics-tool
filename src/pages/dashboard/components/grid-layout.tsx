import React from "react";
import RGL, { Layout, WidthProvider } from "react-grid-layout";
import { Empty } from "antd";

// contexts
import { useAppContext } from "@src/contexts/app-context";

// types
import { IKeyChart } from "@src/types/chart";

// components
import ChartRenderer from "./chart-renderer";
import HeadingChart from "@src/components/chart/heading-chart";

const ReactGridLayout = WidthProvider(RGL);

function LayoutItem({ layout }: any) {
  return (
    <React.Fragment key={layout.i}>
      <HeadingChart layout={layout} />
      <ChartRenderer vizState={layout.vizState} />
    </React.Fragment>
  );
}

function GridLayout() {
  const { charts, isDisableDragGrid } = useAppContext();
  const [layouts, setLayouts] = React.useState<Layout[]>([]);
  const [defaultProps] = React.useState({
    className: "layout",
    rowHeight: 115,
    cols: 12,
    autoSize: true,
    isResizable: true,
    isDraggable: true,
  });

  React.useEffect(() => {
    if (!charts) return;
    generateLayout(charts);
  }, [charts]);

  function generateLayout(payload: IKeyChart | null) {
    if (!payload) return;

    const newLayouts = Object.values(payload || {}).map((item, i) => {
      const w = 2 * 3;
      const h = 3;
      const grid = {
        x: Number((i % 2) * w),
        y: Number(Math.floor(i / 3) * h),
        w,
        h,
        i: i.toString(),
        ...item,
      };
      return grid;
    });
    setLayouts(newLayouts);
  }

  return (
    <>
      {layouts.length > 0 ? (
        <ReactGridLayout
          {...defaultProps}
          draggableHandle={isDisableDragGrid ? ".draggable-handle" : ""}
          layout={layouts}
        >
          {layouts.map((layout) => (
            <div key={layout.i} data-grid={layout} className="dark:bg-[#141414]">
              <LayoutItem layout={layout} />
            </div>
          ))}
        </ReactGridLayout>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <Empty />
        </div>
      )}
    </>
  );
}

export default GridLayout;
