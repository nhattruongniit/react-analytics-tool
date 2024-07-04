import React from "react";
import { Button, theme, Form, Input, Radio } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import clsx from "clsx";

// config
import { ADAPTER_QUERY_BUILDER } from "@src/config/query-builder";

// components
import DbtExplorer from "./components/dbt-explorer";

// context
import { useMultiStepQuery } from "@src/contexts/multi-step-query-context";
import { useWarehouseContext } from "@src/contexts/warehouse-context";

// hooks
import { useResizeQuerySidebar } from "@src/hooks/multi-step-query/use-resize-query-sidebar";
import BuilderPanel from "./components/builder-panel";
import { dataColumns, dataSource } from "@src/mocks/table-chart-mock";

function QuerySidebar() {
  const { token } = theme.useToken();
  // contexts
  const {
    updateMethodsNode,
    collapseQuerySidebar,
    updateMethodsQuerySidebar,
    nodeType,
    explorerNode,
    updateNodeType,
    visualization,
    openCollapseVisualization,
  } = useMultiStepQuery();
  const { queryExplore } = useWarehouseContext();

  // refs
  const resizerHandlerRef = React.useRef<HTMLDivElement>(null);
  const querySidebarRef = React.useRef<HTMLDivElement>(null);
  // resize handler hooks
  useResizeQuerySidebar({ querySidebarRef, resizerHandlerRef, isOpen: collapseQuerySidebar.isOpen });

  // form
  const [form] = Form.useForm();
  const initialValues = {
    name: "",
    dependencies: [],
    alias: "",
  };

  // initialize
  React.useEffect(() => {
    form.resetFields(); // reset form

    // initialize form
    form.setFieldValue("alias", explorerNode?.alias);
    form.setFieldValue("name", explorerNode?.name || "untitled");
    form.setFieldValue("dependencies", explorerNode?.dependencies || []);
  }, [explorerNode, form]);

  async function runQuery() {
    updateMethodsNode.setVisualization({
      dataSource: dataSource,
      columns: dataColumns,
    });
    openCollapseVisualization(true);
  }

  async function onFinish(values: any) {
    let nodeItem: any = {
      name: "",
      alias: "",
      adapter_name: "cube",
      dependencies: [],
    };
    switch (nodeType) {
      case ADAPTER_QUERY_BUILDER.cube.value: {
        nodeItem = {
          name: values.name.trim(),
          alias: values.alias.trim(),
          adapter_name: "cube",
          dependencies: [],
          model_config: {
            json_query: queryExplore,
          },
        };
        break;
      }
      case ADAPTER_QUERY_BUILDER["dbt-like"].value: {
        nodeItem = {
          name: values.name,
          alias: values.alias,
          adapter_name: "dbt-like",
          dependencies: values.dependencies,
        };
        break;
      }
      default:
        break;
    }
    updateMethodsNode.add(nodeItem);
    closeQuerySidebar();
  }

  function closeQuerySidebar() {
    form.resetFields();
    updateMethodsQuerySidebar.close();
    updateMethodsNode.setNode(null);
    form.setFieldValue("name", "untitled");
    updateMethodsNode.setVisualization(null);
  }

  return (
    <div
      ref={querySidebarRef}
      className={clsx(
        "border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-l-[1px] border-solid  h-[calc(100vh-67px)] shrink-0 overflow-hidden",
      )}
      style={{
        backgroundColor: token.colorBgElevated,
        width: collapseQuerySidebar.isOpen ? "500px" : "50px",
      }}
    >
      <div
        className={clsx(
          "flex items-center justify-center border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-solid py-2",
          collapseQuerySidebar.isOpen ? "hidden" : "block",
        )}
      >
        <Button type="text" size="small" onClick={() => updateMethodsQuerySidebar.open(!collapseQuerySidebar.isOpen)}>
          <LeftOutlined
            style={{
              color: token.colorPrimary,
            }}
          />
        </Button>
      </div>

      <div className={clsx("relative h-full", collapseQuerySidebar.isOpen ? "block" : "hidden")}>
        {/* resize handle */}
        <div
          className={clsx(
            "absolute left-0 top-0 right-0 bottom-0 w-[10px] z-10",
            !!visualization && "hidden", // hide resize handle when visualization is open
          )}
        >
          <div
            id="resize-handle-sidebar"
            ref={resizerHandlerRef}
            className="w-[24px] h-[32px] absolute top-1/2 -mt-[12px] -left-[12px] cursor-ew-resize"
          >
            <div className="w-[3px] h-[22px] absolute top-1/2 left-1/2 -mt-[12px]  bg-[#80868b] text-[#80868b]" />
          </div>
        </div>
        <Form form={form} initialValues={initialValues} onFinish={onFinish} className="flex flex-col justify-between">
          <div className="flex items-center border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-solid p-2">
            <Button
              type="text"
              size="small"
              onClick={() => updateMethodsQuerySidebar.open(!collapseQuerySidebar.isOpen)}
            >
              {collapseQuerySidebar.isOpen ? (
                <RightOutlined
                  style={{
                    color: token.colorPrimary,
                  }}
                />
              ) : (
                <LeftOutlined
                  style={{
                    color: token.colorPrimary,
                  }}
                />
              )}
            </Button>
            <div className="flex items-center justify-between w-full">
              <div className="font-bold">{collapseQuerySidebar.type === "create" ? "Create" : "View"} Node</div>
            </div>
          </div>

          {/* query builder */}
          <div className="overflow-auto h-[calc(100vh-155px)] px-2">
            <div className="p-2">
              <Form.Item
                label="Alias"
                name="alias"
                className="mb-2"
                rules={[
                  {
                    required: true,
                    validator: async (_, value) => {
                      const pattern = new RegExp("^[a-zA-Z0-9_]*$");
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
                <Input disabled={collapseQuerySidebar.type === "view"} />
              </Form.Item>
              <Form.Item label="Name" name="name" className="mb-2">
                <Input placeholder="Please input alias name" />
              </Form.Item>
            </div>
            <div className="flex items-center justify-end w-full">
              <Radio.Group
                disabled={collapseQuerySidebar.type === "view"}
                size="small"
                value={nodeType}
                onChange={(e) => updateNodeType(e.target.value)}
              >
                {Object.keys(ADAPTER_QUERY_BUILDER).map((key, index) => (
                  <Radio.Button key={index} value={ADAPTER_QUERY_BUILDER[key].value}>
                    {ADAPTER_QUERY_BUILDER[key].label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
            {nodeType === ADAPTER_QUERY_BUILDER.cube.value && <BuilderPanel />}
            {nodeType === ADAPTER_QUERY_BUILDER["dbt-like"].value && <DbtExplorer />}
          </div>

          {/* run query */}
          <div className="text-right  flex items-center justify-between border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-t-[1px] pt-2 px-2 border-solid">
            <Button onClick={runQuery}>Run Query</Button>

            {collapseQuerySidebar.type === "create" && (
              <div>
                <Button onClick={closeQuerySidebar} className="mr-2">
                  Cancel
                </Button>

                <Button type="primary" onClick={() => form.submit()}>
                  {collapseQuerySidebar.type === "create" ? "Create" : "Update"}
                </Button>
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default QuerySidebar;
