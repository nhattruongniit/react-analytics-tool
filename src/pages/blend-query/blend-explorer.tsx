import React from "react";
import clsx from "clsx";
import { Button, Popconfirm, theme, Space, Table, Tag, Form } from "antd";
import type { TableProps } from "antd";
import { CloseOutlined } from "@ant-design/icons";

// context
import { DEFAULT_SOURCE, DIMENSIONS, JOINS, SOURCE, useBlenderContext } from "@src/contexts/blender-context";

// components
import BlendStep from "./components/blend-data/blend-step";
import JoinAnotheStep from "./components/blend-data/join-another-step";
import BlendResult from "./components/blend-data/blend-result";
import JoinConfiguration from "./components/join-configuration/join-configuration";
import JoinAnotherStepDummy from "./components/blend-data/join-another-step-dummy";
import { IBlendData } from "@src/types/blender";

interface DataType {
  key: number;
  alias: string;
}


function BlendExplorer() {
  const { token } = theme.useToken();
  const { form, openBlendExplorer, isOpenBlend, blendData, editBlendNode } = useBlenderContext();
  const joinAnotherStepDummyRef = React.useRef<any>(null);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Alias",
      dataIndex: "alias",
      key: "alias",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => {
        const node: any = blendData?.[record.alias as keyof IBlendData];
        return (
          <Space size="middle">
            <Button type="text" onClick={() => editBlendNode(node)}>
              Edit
            </Button>
            <Button danger type="text">
              Delete
            </Button>
          </Space>
        )
      }
    },
  ];

  const dataSource: DataType[] = Object.values(blendData || {}).map((blend: any, index) => ({
    key: index,
    alias: blend.alias as string
  }))

  return (
    <>
      <div className="text-right mt-2 mr-2.5">
        <Button type="primary" size="middle" onClick={() => openBlendExplorer(true)}>
          Create
        </Button>
      </div>

      <div className="p-2.5">
        <Table columns={columns} dataSource={dataSource} />
      </div>

      <div className={clsx("w-full h-full flex absolute bottom-2 left-0", isOpenBlend ? "block" : "hidden")}>
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
                <Button type="text" icon={<CloseOutlined />}>
                  Close
                </Button>
              </Popconfirm>
            </div>
            <div className="flex h-[calc(100%-41px)]">
              <div className="flex items-start p-2 w-full overflow-auto">
                <Form.List name={SOURCE}>
                  {(fields, { add: addSource }) => {
                    function addAnotherStep(node: string, index: number) {
                      addSource({
                        ...DEFAULT_SOURCE,
                        query_step_alias: node,
                        source_alias: `${node}_${index}`,
                      });
                      joinAnotherStepDummyRef.current?.createJoin();
                    }
                    return (
                      <React.Fragment>
                        {fields.map(({ key, name }, index) => (
                          <div
                            key={key}
                            className="h-full"
                            style={{
                              order: index * 2,
                            }}
                          >
                            <BlendStep name={name} form={form} />
                          </div>
                        ))}
                        <div
                          className="shrink-0"
                          style={{
                            order: 99999,
                          }}
                        >
                          <JoinAnotheStep index={fields.length} addAnotherStep={addAnotherStep} />
                        </div>
                      </React.Fragment>
                    );
                  }}
                </Form.List>
                <Form.List name={JOINS}>
                  {(fields, { add: addJoin }) => {
                    return (
                      <React.Fragment>
                        {/* join configuration */}
                        {fields.map(({ key, name: nameJoin }, index) => {
                          return (
                            <div
                              key={key}
                              className="shrink-0"
                              style={{
                                order: index * 2 + 1,
                              }}
                            >
                              <JoinConfiguration index={index} nameJoin={nameJoin} form={form} />
                            </div>
                          );
                        })}

                        {/* dummy join another step */}
                        <JoinAnotherStepDummy ref={joinAnotherStepDummyRef} addJoin={addJoin} />
                      </React.Fragment>
                    );
                  }}
                </Form.List>

                {/* just show to make sure the form's DIMENSIONS is registered */}
                <Form.List name={DIMENSIONS}>
                  {() => {
                    return null;
                  }}
                </Form.List>
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
