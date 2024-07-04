import { CloseOutlined, DragOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import clsx from "clsx";
import { Draggable } from "react-beautiful-dnd";

const options = [
  { label: "ASC", value: "asc" },
  { label: "DESC", value: "desc" },
];

type IProps = {
  id: string;
  index: number;
  title: string;
  order: string;
  removeOrder: (id: string) => void;
  onOrderChange: (id: string, value: string) => void;
  isHidden: boolean;
};

function OrderDragItem({ id, index, title, order, removeOrder, onOrderChange, isHidden }: IProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx("flex items-center mb-2 justify-between", isHidden && "hidden")}
        >
          <div className="w-[200px] break-words grow shrink-0 mr-2">
            <DragOutlined />
            <span className="ml-2">{title}</span>
          </div>
          <div className="flex items-center">
            <Radio.Group
              size="small"
              options={options}
              optionType="button"
              value={order}
              onChange={(e) => onOrderChange(id, e.target.value)}
            />
            <div className="cursor-pointer ml-2" onClick={() => removeOrder(id)}>
              <CloseOutlined className="text-[#f00]" />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default OrderDragItem;
