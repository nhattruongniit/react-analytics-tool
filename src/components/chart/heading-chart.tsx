import React from "react";
import { CSVLink } from "react-csv";
import { Button, Divider, Popover, Select, Space, Tooltip, message } from "antd";

import {
  BarChartOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  LineChartOutlined,
  TableOutlined,
} from "@ant-design/icons";

// types
import { IChart } from "@src/types/chart";

// context
import { useAppContext } from "@src/contexts/app-context";

type IProps = {
  layout: IChart;
};

function HeadingChart({ layout }: IProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const btnCSVRef = React.useRef<any>(null);
  const { deleteChart, changeChartType, setChartDefault, setIsOpenExploreModal, tablePivot, tableColumns } =
    useAppContext();

  function editChart() {
    const chart = {
      id: layout.id,
      name: layout.name,
      vizState: layout.vizState,
    };
    setChartDefault({
      ...chart,
      action: "edit",
    });
    setIsOpenExploreModal(true);
  }

  return (
    <>
      {contextHolder}
      <div className="bg-white dark:bg-[#202020] py-2 pl-4 pr-2 flex items-center justify-between border-0 border-b-[1px] border-solid border-[#e0e0e0] dark:border-[#2b2b2b]">
        <div className="flex items-center">
          <div className="text-[18px] text-[#5b5c7d] mr-6 dark:text-white">{layout.name}</div>
        </div>
        <div className="flex items-center">
          <div className="mr-2">
            <Tooltip title="Export CSV">
              <CSVLink
                ref={btnCSVRef}
                filename={layout.name}
                data={tablePivot}
                headers={tableColumns.map((c: any) => {
                  return { label: c.title, key: c.key };
                })}
              >
                <Button
                  type="text"
                  style={{ color: "#1677ff" }}
                  icon={<DownloadOutlined />}
                  onMouseDown={() => {
                    btnCSVRef.current.link.click();
                    messageApi.open({
                      type: "success",
                      content: "Export CSV success!",
                    });
                  }}
                />
              </CSVLink>
            </Tooltip>
          </div>
          <Popover
            className="cursor-pointer"
            destroyTooltipOnHide
            arrow={false}
            placement="bottomRight"
            content={
              <div className="w-[150px]">
                <div className="mb-2">Chart type:</div>
                <Select
                  style={{ width: "100%" }}
                  placeholder="select one country"
                  value={layout.vizState.chartType}
                  onChange={(value) => changeChartType(value, layout.id)}
                  options={[
                    { value: "line", label: "Line chart", icon: <LineChartOutlined /> },
                    { value: "bar", label: "Bar chart", icon: <BarChartOutlined /> },
                    { value: "table", label: "Table", icon: <TableOutlined /> },
                  ]}
                  optionRender={(option) => (
                    <Space>
                      {option.data.icon} {option.data.label}
                    </Space>
                  )}
                />

                <Divider className="p-0 m-0 my-2" />
                <div className="w-full">
                  <Button type="text" className="w-full text-left text-[#1677ff]" onMouseDown={editChart}>
                    Edit
                  </Button>
                </div>
                <div className="w-full">
                  <Button danger type="text" className="w-full text-left" onMouseDown={() => deleteChart(layout.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            }
          >
            <div className="flex items-center justify-center w-[32px] h-[32px]">
              <EllipsisOutlined rotate={90} />
            </div>
          </Popover>
        </div>
      </div>
    </>
  );
}

export default HeadingChart;
