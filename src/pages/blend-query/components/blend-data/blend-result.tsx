import React from "react";
import { Button, Input, Form } from "antd";

// context
import { DIMENSIONS, SOURCE, useBlenderContext } from "@src/contexts/blender-context";
import { IDimensionBlender, IMeasureBlender, INodeBlenderItem } from "@src/types/blender";

// configs
import { config } from "@src/config";

// components
import BlendResultItem from "./blend-result-item";

function BlendResult() {
  const { form } = useBlenderContext();
  const nodes = Form.useWatch(SOURCE);

  const { dimensions, measures } = React.useMemo(() => {
    const dimensions: IDimensionBlender[] = [];
    const measures: IMeasureBlender[] = [];

    if (!nodes) return { dimensions, measures };

    nodes.forEach((node: INodeBlenderItem) => {
      node.dimensions.forEach((dimension) => {
        dimensions.push({
          ...dimension,
          step: node.source_alias || node.query_step_alias,
        });
      });

      node.measures.forEach((measure) => {
        measures.push({
          ...measure,
          step: node.source_alias || node.query_step_alias,
        });
      });
    });

    return { dimensions, measures };
  }, [nodes]);

  // set dimensions for form DIMENSIONS
  React.useEffect(() => {
    if (dimensions.length === 0 && measures.length === 0) return;
    const resultDimensions = dimensions.map((item) => ({
      name: item.name,
      type: item.type,
      args: [`${item.step}.${item.name}`],
    }));
    const resultMeasures = measures.map((item) => ({
      name: item.name,
      type: item.type,
      args: [`${item.step}.${item.name}`],
    }));

    form.setFieldValue([DIMENSIONS], [...resultDimensions, ...resultMeasures]);
  }, [dimensions, form, measures]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="p-2 h-full overflow-auto">
        <div className="blender-step-result">
          <Form.Item
            label="Data source name"
            name="alias"
            rules={[
              {
                required: true,
                validator: async (_, value) => {
                  const pattern = new RegExp(config.PATTERN);
                  if (!pattern.test(value)) {
                    return Promise.reject(new Error("Only allow input text, number and underscore!"));
                  }
                  if (!value) {
                    return Promise.reject(new Error("Please input name!"));
                  }
                },
              },
            ]}
          >
            <Input className="p-0" placeholder="(Blended Data)" variant="borderless" />
          </Form.Item>
        </div>
        <div className="mb-3 text-[12px]">
          <div className="mb-1">
            <div className="font-bold mb-1">Included dimensions and metrics</div>
            {dimensions.map((item, index) => (
              <BlendResultItem key={index} data={item} bgColor="#d9f7be" />
            ))}

            {measures.map((item, index) => (
              <BlendResultItem key={index} data={item} bgColor="#d9f7be" />
            ))}
          </div>
        </div>
      </div>
      <div className="border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-t-[1px] border-solid shrink-0">
        <div className="m-2">
          <Button
            type="primary"
            className="w-full"
            onClick={() => {
              form.submit();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlendResult;
