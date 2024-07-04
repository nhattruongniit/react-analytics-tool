import React from "react";
import { Button, Modal, Select, Tooltip } from "antd";
import { CloseOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

// configs
import { MEMBER_OPERATORS } from "@src/config/blend-explorer";

export default function BlendFilters() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function handleOk() {
    setIsModalOpen(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="mb-3 text-[12px]">
        <div className="blend-member mb-1">
          <div className="font-bold mb-1">Filters</div>
          <div
            className="flex items-center mb-1 text-[#000] h-[22px]"
            style={{
              backgroundColor: "#e5e7eb",
            }}
          >
            <div
              className="shrink-0 border-0 border-solid border-r-[1px] border-white cursor-pointer hover:bg-gray-300"
              onClick={handleOpenModal}
            >
              <div className="px-1">
                <EditOutlined />
              </div>
            </div>
            <Tooltip title="firebase__event_timestamp_day">
              <div className="p-1 w-full truncate">firebase__event_timestamp_day</div>
            </Tooltip>
            <Button danger type="text" size="small" icon={<CloseOutlined />} className="btn-close" />
          </div>
        </div>

        <Button
          type="dashed"
          size="small"
          icon={<PlusCircleOutlined />}
          className="w-full text-left"
          onClick={handleOpenModal}
        >
          Add a filter
        </Button>
      </div>

      <Modal
        title="Create Filter"
        width={800}
        className="modal-analytics"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex justify-between">
          <Select
            showSearch
            className="w-full"
            placeholder="Select a member"
            options={[
              {
                label: "firebase__event_timestamp_day",
                value: "firebase__event_timestamp_day",
              },
              {
                label: "firebase__platform",
                value: "firebase__platform",
              },
            ]}
            filterOption={(input, select) => {
              return select ? select?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
            }}
          />
          <Select
            showSearch
            className="w-[45%] mx-2"
            placeholder="Select a operator"
            defaultValue="equals"
            options={MEMBER_OPERATORS}
            filterOption={(input, select) => {
              return select ? select?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
            }}
          />
          <div className="w-1/3">
            <Select className="w-full" placeholder="Input string" style={{ minWidth: 200 }} mode="tags" />
          </div>
        </div>
      </Modal>
    </>
  );
}
