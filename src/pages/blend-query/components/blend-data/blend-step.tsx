import { Button, Card, Form, Input, Popconfirm, Select } from "antd";
import { FormInstance } from "antd/lib/form/Form";
import { DeleteOutlined } from "@ant-design/icons";

// context
import { DEFAULT_JOIN, JOINS, SOURCE } from "@src/contexts/blender-context";

// types
import { IJoinOn, INodeBlenderItem } from "@src/types/blender";

// components
import BlendFilters from "./blend-filters";
import BlendAvaiable from "./blend-avaialable";
import BlendDimensions from "./blend-dimensions";
import BlendMeasure from "./blend-measures";

// mocks
import { nodeOptions, schema } from "@src/mocks/blend-query-mock";

type IProps = {
  name: number;
  form: FormInstance<any>;
};

function BlendStep({ name, form }: IProps) {
  // variables
  const source: INodeBlenderItem = Form.useWatch([SOURCE, name]);
  const joins: IJoinOn[] = form.getFieldValue(JOINS) || [];

  // TODO: remove source
  function removeSource() {
    console.log("remove source");
  }

  return (
    <Card
      size="small"
      className="blend_step_card w-[450px] h-full"
      title={
        <>
          <div className="my-2">
            <div className="flex justify-between">
              <div>
                <Form.Item noStyle name={[name, "query_step_alias"]}>
                  <Input
                    disabled
                    className="p-0 text-[14px] text-black dark:text-white font-bold"
                    variant="borderless"
                  />
                </Form.Item>
                <div className="mb-2">
                  <Form.Item noStyle name={[name, "source_alias"]}>
                    <Input disabled className="p-0" placeholder="(Source alias)" variant="borderless" />
                  </Form.Item>
                </div>
              </div>
              <Popconfirm
                title="Delete the source"
                description="Are you sure to delete this source?"
                onConfirm={removeSource}
                okText="Yes"
                cancelText="No"
              >
                <Button danger type="text" icon={<DeleteOutlined />} onClick={removeSource} />
              </Popconfirm>
            </div>
            <Form.Item noStyle name={[name, "query_step_alias"]}>
              <Select
                showSearch
                placeholder="Select choose source"
                optionFilterProp="label"
                className="w-full"
                options={nodeOptions.map((node) => ({
                  value: node,
                  label: node,
                }))}
                onChange={(value) => {
                  // reset join itself and from this source onwards
                  joins.forEach((_, index) => {
                    if (index >= name - 1) {
                      form.setFieldValue([JOINS, index], {
                        ...DEFAULT_JOIN,
                      });
                    }
                  });

                  // add new source
                  form.setFieldValue([SOURCE, name, "query_step_alias"], value);
                  form.setFieldValue([SOURCE, name, "source_alias"], `${value}_${name}`);
                  form.setFieldValue([SOURCE, name, "dimensions"], []);
                  form.setFieldValue([SOURCE, name, "measures"], []);
                  form.setFieldValue([SOURCE, name, "filters"], []);
                }}
              />
            </Form.Item>
          </div>
        </>
      }
    >
      <div className="flex h-full">
        <div className="w-1/2 shrink-0 overflow-auto p-2">
          <BlendDimensions name={name} schema={schema} source={source} />

          <BlendMeasure name={name} schema={schema} source={source} />

          <BlendFilters name={name} schema={schema} source={source} />
        </div>

        <div className="bg-white dark:bg-[#141414] border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-l-[1px] border-solid w-1/2 p-2 text-[12px] overflow-auto">
          <BlendAvaiable schema={schema} />
        </div>
      </div>
    </Card>
  );
}

export default BlendStep;
