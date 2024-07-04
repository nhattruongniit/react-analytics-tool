import { Card, Input, Select } from "antd";

import BlendFilters from "./blend-filters";
import BlendAvaiable from "./blend-avaialable";
import BlendDimensions from "./blend-dimensions";
import BlendMeasure from "./blend-measures";

function BlendStep() {
  return (
    <Card
      size="small"
      className="blend_step_card w-[380px] h-full"
      title={
        <>
          <div className="my-2">
            <div className="text-[12px]">Tony</div>
            <div className="mb-2">
              <Input className="p-0" placeholder="(Source alias)" variant="borderless" />
            </div>
            <Select
              showSearch
              placeholder="Select choose source"
              optionFilterProp="label"
              className="w-full"
              defaultValue={"tony"}
              options={[
                {
                  value: "tony",
                  label: "tony",
                },
                {
                  value: "tony_sql",
                  label: "tony_sql",
                },
                {
                  value: "tony2",
                  label: "tony2",
                },
              ]}
            />
          </div>
        </>
      }
    >
      <div className="flex h-full">
        <div className="w-1/2 shrink-0 overflow-auto p-2">
          <BlendDimensions />

          <BlendMeasure />

          <BlendFilters />
        </div>

        <div className="bg-white dark:bg-[#141414] border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-l-[1px] border-solid w-1/2 p-2 text-[12px] overflow-auto">
          <BlendAvaiable />
        </div>
      </div>
    </Card>
  );
}

export default BlendStep;
