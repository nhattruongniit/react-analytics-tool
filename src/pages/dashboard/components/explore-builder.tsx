import React from "react";
import { Button, Modal, Form, Input, Tabs, Row, Col, Divider } from "antd";
import { DeploymentUnitOutlined, ExperimentOutlined } from "@ant-design/icons";

// context
import { useAppContext } from "@src/contexts/app-context";
import { useExploreContext } from "@src/contexts/explore-context";

// components
import OrderGroup from "@src/components/query-builder/order-group";
import JsonViewer from "@src/components/query-builder/json-viewer";

// dropdown v2
import MemberGroupDimensions from "@src/components/query-builder/v2/member-group-dimensions";
import MemberGroupMeasure from "@src/components/query-builder/member-group-measure";

function ExploreQuery() {
  const [form] = Form.useForm();
  const {
    addChart,
    editChart,
    isOpenExploreModal,
    setIsOpenExploreModal,
    setChartDefault,
    chartDefault,
    runOnceEditOrder,
    setIsStartEditOrder,
  } = useAppContext();

  const {
    measures,
    availableMeasures,
    dimensions,
    availableDimensions,
    setMeasures,
    setDimensions,
    orders,
    setOrders,
    queryExplore,
  } = useExploreContext();

  // initialize query builder
  React.useEffect(() => {
    if (!chartDefault) return;
    form.setFieldsValue({ name: chartDefault.name });
  }, [chartDefault, form]);

  const initialValues = {
    name: "",
  };

  function onFinish(values: any) {
    const name = values.name || "Untitled";

    if (chartDefault?.action === "edit") {
      const chartItem = {
        ...chartDefault,
        name,
        vizState: {
          query: queryExplore,
          chartType: chartDefault.vizState.chartType,
        },
      };
      editChart(chartItem);
    } else {
      const chartItem = {
        id: Date.now(),
        name,
        vizState: {
          query: queryExplore,
          chartType: "line",
        },
      };
      addChart(chartItem);
    }

    // reset
    resetExploreBuilder();
  }

  function resetExploreBuilder() {
    form.resetFields();
    setIsOpenExploreModal(false);
    setChartDefault(null);
    runOnceEditOrder.current = true;
    setIsStartEditOrder(false);
    setDimensions([]);
    setMeasures([]);
    setOrders([]);
  }

  return (
    <Form form={form} initialValues={initialValues} onFinish={onFinish}>
      <div className="text-right mt-2 mr-2.5">
        <Button type="primary" size="middle" onClick={() => setIsOpenExploreModal(true)}>
          Explore
        </Button>
      </div>
      <Modal
        title="Explore Builder"
        open={isOpenExploreModal}
        width={850}
        className="modal-analytics"
        okText="Submit"
        okButtonProps={{
          disabled:
            Object.keys(queryExplore.dimensions).length === 0 || Object.keys(queryExplore.measures).length === 0,
        }}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          resetExploreBuilder();
        }}
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Query builder",
              icon: <ExperimentOutlined />,
              children: (
                <div>
                  <div>
                    <Form.Item
                      label="Title"
                      name="name"
                      rules={[{ required: true, message: "Please input your title!" }]}
                    >
                      <Input type="text" name="name" placeholder="Exploration short title" />
                    </Form.Item>
                  </div>

                  <Divider />

                  <Row gutter={16} className="my-2">
                    <Col span={12}>
                      <MemberGroupDimensions
                        title="Dimensions"
                        description="Select dimensions to display"
                        members={dimensions}
                        availableMembers={availableDimensions}
                        setDimensions={setDimensions}
                      />
                    </Col>
                    <Col span={12}>
                      <MemberGroupMeasure
                        title="Measures"
                        description="Select measures to display"
                        members={measures}
                        availableMembers={availableMeasures}
                        setMeasures={setMeasures}
                      />
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <OrderGroup
                        title="Order"
                        dimensions={dimensions}
                        measures={measures}
                        orders={orders}
                        setOrders={setOrders}
                      />
                    </Col>
                  </Row>
                </div>
              ),
            },
            {
              key: "2",
              label: "JSON Query",
              icon: <DeploymentUnitOutlined />,
              children: <JsonViewer queryExplore={queryExplore} />,
            },
          ]}
        />
      </Modal>
    </Form>
  );
}

export default ExploreQuery;
