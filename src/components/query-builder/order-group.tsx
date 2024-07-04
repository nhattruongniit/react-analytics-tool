import React, { Dispatch, SetStateAction } from "react";
import { Card } from "antd";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { PlusOutlined } from "@ant-design/icons";

// types
import { IMemberDimensions, IMemberMeasures, IMemberOrder } from "@src/types/query-builder";

// components
import OrderDragItem from "./orders/order-drag-item";
import DropdownBase from "../dropdown/dropdown-base";

type IProps = {
  title: string;
  dimensions: IMemberDimensions[];
  measures: IMemberMeasures[];
  orders: string[][];
  setOrders: Dispatch<SetStateAction<string[][]>>;
};

type IOptions = {
  label: string;
  value: string;
};

export default function OrderGroup({ title, orders, setOrders, dimensions = [], measures = [] }: IProps) {
  const [dataOrder, setDataOrder] = React.useState<IMemberOrder[]>([]);

  const availableMembers = React.useMemo(() => {
    const dimensionsFiltered = dimensions.map((m) => ({ value: m.name, label: m.title }));
    const measuresFiltered = measures.map((m) => ({ value: m.name, label: m.title }));
    return [...dimensionsFiltered, ...measuresFiltered];
  }, [dimensions, measures]);

  React.useEffect(() => {
    const newOrders = orders.reduce((acc: any, currItem: any) => {
      const member = availableMembers.find((member) => member.value === currItem[0]);
      if (member) {
        acc.push({
          id: member.value,
          title: member.label,
          order: currItem[1],
        });
      }
      return acc;
    }, []);

    setDataOrder(newOrders);
  }, [orders, availableMembers]);

  function onDragEnd({ source, destination }: DropResult) {
    if (!source || !destination) return;
    const [removed] = orders.splice(source.index, 1);
    orders.splice(destination.index, 0, removed);
    setOrders([...orders]);
  }

  function addItemOrder(option: IOptions) {
    setOrders([...orders, [option.value, "asc"]]);
  }

  function removeOrder(id: string) {
    const index = orders.findIndex((order: any) => order[0] === id);
    orders.splice(index, 1);
    setOrders([...orders]);
  }

  function onOrderChange(id: string, value: any) {
    const index = orders.findIndex((order: any) => order[0] === id);
    orders[index][1] = value;
    setOrders([...orders]);
  }

  return (
    <Card
      size="small"
      title={title}
      className="h-full"
      extra={
        <DropdownBase
          data-testid="order-dropdown-base"
          type="dashed"
          availableMembers={availableMembers.filter((m) => !dataOrder.some((order) => order.id === m.value))}
          onClick={addItemOrder}
        >
          Add <PlusOutlined />
        </DropdownBase>
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1" type="PERSON">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {dataOrder.map(({ id, title, order }: IMemberOrder, index) => {
                // const isHidden = order === "none";
                return (
                  <OrderDragItem
                    key={id}
                    id={id}
                    title={title}
                    order={order}
                    index={index}
                    removeOrder={removeOrder}
                    onOrderChange={onOrderChange}
                    isHidden={false}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
}
