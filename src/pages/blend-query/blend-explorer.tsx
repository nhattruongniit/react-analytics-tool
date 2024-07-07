import React from "react";
import clsx from "clsx";
import { Button, Popconfirm, theme, Space, Table, Tag } from "antd";
import type { TableProps } from 'antd';
import { CloseOutlined } from "@ant-design/icons";


// components
import BlendStep from "./components/blend-step";
import JoinConfiguration from "./components/join-configuration";
import JoinAnotheStep from "./components/join-another-step";
import BlendResult from "./components/blend-result";

interface DataType {
  key: string;
  name: string;
  source: string;
}

function BlendExplorer() {
  const { token } = theme.useToken();
  const [isOpenBlend, setIsOpenBlend] = React.useState(false);

  function openBlendExplorer(isOpen: boolean) {
    setIsOpenBlend(isOpen)
  }

  console.log('isOpenBlend: ', isOpenBlend)


const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Source',
    dataIndex: 'source',
    key: 'source',
  },
  {
    title: 'Action',
    key: 'action',
    width: 200,
    render: (_, record) => (
      <Space size="middle">
        <Button danger type="text">Delete</Button>
      </Space>
    ),
  },
];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      source: 'tony - tony2',
    },
    {
      key: '2',
      name: 'Jim Green',
      source: 'tony - tonysql',
    },
  ];

  return (
    <>
      <div className="text-right mt-2 mr-2.5">
        <Button type="primary" size="middle" onClick={() => openBlendExplorer(true)}>
          Create
        </Button>
      </div>

      <div className="p-2.5">
        <Table columns={columns} dataSource={data} />
      </div>

      <div className={clsx(
        "w-full h-full flex absolute bottom-2 left-0",
        isOpenBlend ? 'block' : 'hidden'
      )}>
        <div className="block">
          <div
            className="absolute top-0 left-0 right-0 bottom-0 opacity-50"
            style={{
              backgroundColor: token.colorBgMask,
            }}
          />
          <div
            className="absolute right-0 left-0 bottom-0 top-1/4 z-10 border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-t-[1px] border-solid"
            style={{
              backgroundColor: token.colorBgElevated,
            }}
          >
            <div className="flex items-center justify-between border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-solid p-2">
              <b>Blend Explorer</b>
              <Popconfirm
                  title="Close"
                  description="Are you sure to close this blend?"
                  onConfirm={() => openBlendExplorer(false)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="text" icon={<CloseOutlined />}>Close</Button>
                </Popconfirm>
            </div>
            <div className="flex h-[calc(100%-41px)]">
              <div className="flex items-start p-2 w-full overflow-auto">
                <BlendStep />

                <JoinConfiguration />

                <BlendStep />

                <JoinAnotheStep />
              </div>

              <div className="w-[320px] shrink-0 border-[#E0E0E0] border-[0px] border-l-[1px] dark:border-[#2b2b2b] border-solid">
                <BlendResult />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlendExplorer;
