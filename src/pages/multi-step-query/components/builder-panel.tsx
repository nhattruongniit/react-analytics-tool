import { Col, Row } from "antd";

// components
import MemberGroupMeasure from "@src/components/query-builder/member-group-measure";
import OrderGroup from "@src/components/query-builder/order-group";
import MemberGroupDimensions from "@src/components/query-builder/v2/member-group-dimensions";

// contexts
import { useWarehouseContext } from "@src/contexts/warehouse-context";
import { useMultiStepQuery } from "@src/contexts/multi-step-query-context";

function BuilderPanel() {
  const {
    measures,
    availableMeasures,
    dimensions,
    availableDimensions,
    setMeasures,
    setDimensions,
    orders,
    setOrders,
  } = useWarehouseContext();
  const { explorerNode, collapseQuerySidebar } = useMultiStepQuery();

  let dataDimensions = dimensions;
  let dataMeasures = measures;
  const dataOrders = orders;

  if (collapseQuerySidebar.type === "view") {
    dataDimensions = availableDimensions.filter((item: any) => {
      return explorerNode?.model_config.json_query?.dimensions.includes(item.name);
    });
    dataMeasures = availableMeasures.filter((item: any) => {
      return explorerNode?.model_config.json_query?.measures.includes(item.name);
    });
  }

  return (
    <div>
      <Row gutter={16} className="my-2">
        <Col span={24}>
          <MemberGroupDimensions
            title="Dimensions"
            description="Select dimensions to display"
            members={dataDimensions}
            availableMembers={availableDimensions}
            setDimensions={setDimensions}
          />
        </Col>
      </Row>
      <Row gutter={16} className="my-2">
        <Col span={24}>
          <MemberGroupMeasure
            title="Measures"
            description="Select measures to display"
            members={dataMeasures}
            availableMembers={availableMeasures}
            setMeasures={setMeasures}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <OrderGroup
            title="Order"
            dimensions={dataDimensions}
            measures={dataMeasures}
            orders={dataOrders}
            setOrders={setOrders}
          />
        </Col>
      </Row>
    </div>
  );
}

export default BuilderPanel;
