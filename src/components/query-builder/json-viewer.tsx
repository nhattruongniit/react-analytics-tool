import { Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

type IProps = {
  queryExplore: any;
};

function JsonViewer({ queryExplore }: IProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const jsonQuery = JSON.stringify(queryExplore, null, 2);

  function copySql() {
    navigator.clipboard.writeText(jsonQuery);
    messageApi.open({
      type: "success",
      content: "Copy success!",
    });
  }

  return (
    <>
      {contextHolder}
      <div className="relative">
        <Button
          size="small"
          type="text"
          icon={<CopyOutlined />}
          className="absolute right-0 top-0"
          disabled={Object.keys(jsonQuery || {}).length === 2}
          style={{ color: Object.keys(jsonQuery || {}).length === 2 ? "rgba(0, 0, 0, 0.25)" : "#1677ff" }}
          onClick={copySql}
        >
          Copy
        </Button>
        <SyntaxHighlighter language="json" style={docco}>
          {jsonQuery}
        </SyntaxHighlighter>
      </div>
    </>
  );
}

export default JsonViewer;
