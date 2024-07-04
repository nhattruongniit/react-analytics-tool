import { Form, Select } from "antd";

// contexts
import { useMultiStepQuery } from "@src/contexts/multi-step-query-context";

function DbtExplorer() {
  const { layoutedNodes } = useMultiStepQuery();

  const options = layoutedNodes.map((node) => ({
    label: node.data.label,
    value: node.data.label,
  }));

  return (
    <>
      <Form.Item
        label="Dependencies"
        name="dependencies"
        rules={[{ required: true, message: "Please input dependencies" }]}
        className="mt-4"
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select dependencies"
          // onChange={handleChange}
          options={options}
        />
      </Form.Item>
    </>
  );
}

export default DbtExplorer;
