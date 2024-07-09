import React from "react";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Tooltip } from "antd";
import { FormInstance } from "antd/lib/form/Form";

// context
import { SOURCE } from "@src/contexts/blender-context";

// types
import { INodeBlenderItem } from "@src/types/blender";
import { ISchema } from "@src/types/explorer";

// configs
import { MEMBER_OPERATORS } from "@src/config/blend-explorer";

type IProps = {
  removeFilter: (nodeName: number) => void;
  nodeName: number;
  schema: ISchema[];
  form: FormInstance<any>;
  name: number;
  source: INodeBlenderItem;
};

function BlendFilterModal({ removeFilter, nodeName, schema, name, form, source }: IProps) {
  const [singleModal, setSingeModal] = React.useState(false);
  const dataFilters = Form.useWatch([SOURCE, name, "filters"]);
  const mode = Form.useWatch([SOURCE, name, "filters", nodeName, "mode"]);

  React.useEffect(() => {
    if (mode === "add") {
      setSingeModal(true);
    }
  }, [mode]);

  return (
    <div
      className="flex items-center mb-1 text-[#000] h-[22px]"
      style={{
        backgroundColor: "#e5e7eb",
      }}
    >
      <div
        className="shrink-0 border-0 border-solid border-r-[1px] border-white cursor-pointer hover:bg-gray-300"
        onClick={() => setSingeModal(true)}
      >
        <div className="px-1">
          <EditOutlined />
        </div>
      </div>
      <Tooltip title="firebase__event_timestamp_day">
        <div className="p-1 w-full truncate">{dataFilters?.[nodeName].name}</div>
      </Tooltip>
      <Button
        danger
        type="text"
        size="small"
        icon={<CloseOutlined />}
        className="btn-close"
        onClick={() => removeFilter(nodeName)}
      />
      <Modal
        title="Create Filter"
        width={700}
        className="modal-amanotes"
        open={singleModal}
        onOk={async () => {
          await form.validateFields(); // validate filters

          setSingeModal(false);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { mode, ...restProps } = form.getFieldValue([SOURCE, name, "filters", nodeName]);
          form.setFieldValue([SOURCE, name, "filters", nodeName], restProps);
        }}
        onCancel={() => {
          setSingeModal(false);
          if (!mode) return;
          removeFilter(nodeName);
        }}
      >
        <div className="">
          <div>Name:</div>
          <Form.Item
            name={[nodeName, "name"]}
            className="w-full"
            rules={[{ required: true, message: "Please input name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.List name={[nodeName, "and"]}>
            {(conditionFields, { add: addCondition, remove: removeCondition }) => {
              return (
                <>
                  {conditionFields.map((field) => {
                    const operator = form.getFieldValue([SOURCE, name, "filters", nodeName, "and", field.name, "type"]);

                    return (
                      <div key={field.name} className="flex justify-between mt-3">
                        <Form.Item
                          className="w-full"
                          name={[field.name, "name"]}
                          rules={[{ required: true, message: "Please select a member" }]}
                        >
                          <Select
                            showSearch
                            className="w-full"
                            placeholder="Select a member"
                            options={schema.map((item) => ({
                              label: item.name,
                              value: `${source.source_alias}.${item.name}`,
                            }))}
                            filterOption={(input, select) => {
                              return select ? select?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                            }}
                          />
                        </Form.Item>

                        <Form.Item name={[field.name, "type"]} noStyle>
                          <Select
                            showSearch
                            className="w-[70%] mx-2"
                            placeholder="Select a operator"
                            options={MEMBER_OPERATORS}
                            filterOption={(input, select) => {
                              return select ? select?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false;
                            }}
                          />
                        </Form.Item>

                        <div className="flex w-full">
                          {["set", "notSet"].includes(operator) ? (
                            <div className="w-full" />
                          ) : (
                            <Form.Item
                              name={[field.name, "args"]}
                              className="w-full"
                              rules={[{ required: true, message: "Please enter a value" }]}
                            >
                              <Select
                                className="w-full"
                                placeholder="Input string"
                                style={{ minWidth: 200 }}
                                mode="tags"
                              />
                            </Form.Item>
                          )}

                          {conditionFields.length > 1 && (
                            <Button
                              danger
                              type="text"
                              icon={<CloseOutlined />}
                              className="shrink-0 w-[40px]"
                              onClick={() => removeCondition(field.name)}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="text-right mt-4 mb-5">
                    <Button
                      onClick={async () => {
                        await form.validateFields();
                        addCondition({ name: "", type: "equals", args: [] });
                      }}
                    >
                      Add a condition
                    </Button>
                  </div>
                </>
              );
            }}
          </Form.List>
        </div>
      </Modal>
    </div>
  );
}

export default BlendFilterModal;
