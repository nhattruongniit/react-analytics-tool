import { Button, Form } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

// contexts
import { useBlenderContext } from "@src/contexts/blender-context";

// components
import BlendFilterModal from "./blend-filter-modal";

// types
import { ISchema } from "@src/types/explorer";
import { INodeBlenderItem } from "@src/types/blender";

type IProps = {
  name: number;
  schema: ISchema[];
  source: INodeBlenderItem;
};

export default function BlendFilters({ name, schema, source }: IProps) {
  const { form } = useBlenderContext();

  return (
    <>
      <Form.List name={[name, "filters"]}>
        {(fields, { add, remove: removeFilter }) => {
          return (
            <>
              <div className="mb-3 text-[12px]">
                <div className="blend-member mb-1">
                  <div className="font-bold mb-1">Filters</div>
                  {fields.map(({ key, name: nodeName }) => {
                    return (
                      <BlendFilterModal
                        key={key}
                        removeFilter={removeFilter}
                        nodeName={nodeName}
                        form={form}
                        name={name}
                        schema={schema}
                        source={source}
                      />
                    );
                  })}
                </div>

                <Button
                  type="dashed"
                  size="small"
                  icon={<PlusCircleOutlined />}
                  className="w-full text-left"
                  onClick={() => {
                    add({
                      name: "",
                      and: [{ name: "", type: "equals", args: [] }],
                      mode: "add",
                    });
                  }}
                >
                  Add a filter
                </Button>
              </div>
            </>
          );
        }}
      </Form.List>
    </>
  );
}
