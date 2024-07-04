import React from "react";
import { Button, Empty, Table, theme } from "antd";

import { useMultiStepQuery } from "@src/contexts/multi-step-query-context";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import clsx from "clsx";

function Visualization() {
  const { token } = theme.useToken();

  const { visualization, isCollapsedVisualization, openCollapseVisualization } = useMultiStepQuery();
  return (
    <div
      className={clsx(
        "shrink-0 min-h-[51px] border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-solid transition-all duration-300 ease-in-out overflow-hidden",
        isCollapsedVisualization ? "h-[230px]" : "h-[41px]",
      )}
      style={{
        backgroundColor: token.colorBgElevated,
      }}
    >
      <div className="h-full">
        <div className="flex h-[50px] items-center justify-between border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-solid px-2">
          <b>Visualization</b>
          <Button type="text" size="small" onClick={() => openCollapseVisualization(!isCollapsedVisualization)}>
            {isCollapsedVisualization ? (
              <DownOutlined
                style={{
                  color: token.colorPrimary,
                }}
              />
            ) : (
              <UpOutlined
                style={{
                  color: token.colorPrimary,
                }}
              />
            )}
          </Button>
        </div>
        <div className="overflow-auto h-[177px]">
          {visualization ? (
            <Table
              className="table-visualization"
              size="small"
              dataSource={visualization?.dataSource}
              columns={visualization?.columns}
              pagination={false}
              // scroll={{ y: 150 }}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className="h-full m-0 flex  flex-col items-center justify-center"
              description={
                <span>
                  Please click on the <b>Run Query</b> button to see the visualization.
                </span>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Visualization;
