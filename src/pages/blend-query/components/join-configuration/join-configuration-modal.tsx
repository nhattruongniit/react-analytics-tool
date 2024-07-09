import React from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Form, Modal, Radio } from "antd";
import { FormInstance } from "antd/lib/form/Form";

// config
import { JOIN_TYPE } from "@src/config/query-builder";

// context
import { JOINS } from "@src/contexts/blender-context";

// types
import { IJoinOn } from "@src/types/blender";

// components
import JoinCondition from "./join-condition";

type IProps = {
  index: number;
  nameJoin: number;
  form: FormInstance<any>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  joinItem: any;
};

function JoinConfigurationModal({ form, index, nameJoin, isModalOpen, setIsModalOpen, joinItem }: IProps) {
  // watch form
  const typeField = Form.useWatch([JOINS, nameJoin, "join_type"]);
  const joinOn: IJoinOn[] = Form.useWatch([JOINS, nameJoin, "on"]) || [];
  const joinType = JOIN_TYPE[typeField] || null;
  const isEnabledOk = joinOn.every((item: IJoinOn) => {
    return item.args.every((arg) => arg);
  });

  const isCross = typeField === JOIN_TYPE.CROSS.value;
  const notConditions = joinOn.length === 0 || (joinOn.length > 0 && !isEnabledOk);
  const isShowConfigJoin = !isCross && notConditions;

  function handleOk() {
    setIsModalOpen(false);

    // set empty on if cross join
    if (isCross) {
      form.setFieldValue([JOINS, index, "on"], []);
    }
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCancel() {
    form.setFieldValue([JOINS, index], joinItem);
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="relative px-2 shrink-0 overflow-auto">
        <Divider className="absolute left-0 top-1/2 m-0 bg-blue-700" />
        <div
          className="flex flex-col items-center justify-between relative p-2 cursor-pointer border-[#E0E0E0] border-[1px] dark:border-[#2b2b2b] rounded-md border-solid bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-[#141414]"
          onClick={handleOpenModal}
        >
          {isShowConfigJoin ? (
            <>
              <div className="text-center mb-2">Configure join</div>
              <EditOutlined />
            </>
          ) : (
            <>
              {joinOn.length} {joinOn.length > 1 ? "conditions" : "condition"}
              <img src={joinType?.img} alt="left-outer" className="w-[85px] h-[60px]" />
              <span>{joinType?.label}</span>
            </>
          )}
        </div>
      </div>

      <Modal
        title="Join configuration"
        width={700}
        className="modal-amanotes"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ disabled: !isEnabledOk }}
        onCancel={handleCancel}
      >
        <div className="mb-2 text-[16px]">Join operator</div>
        <div className="text-[12px]">
          Tell us how rows from all the tables on the left and the table to the right are combined.
        </div>

        <div className="mt-2">
          <div className="border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-t-[1px] border-l-[1px] border-solid mb-4">
            <div className="flex border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-solid">
              <Form.Item noStyle name={[nameJoin, "join_type"]}>
                <Radio.Group className="flex w-full">
                  {Object.values(JOIN_TYPE).map((option) => (
                    <Radio
                      key={option.value}
                      value={option.value}
                      className="blend-radio-join-operator flex flex-col items-center m-0 p-0 py-3 cursor-pointer border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-r-[1px] border-solid bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-[#141414] w-full"
                    >
                      <div className="flex flex-col items-center justify-center w-full">
                        <img src={option.img} alt="left-outer" className="w-[85px] h-[60px]" />
                        <div>{option.label}</div>
                      </div>
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="p-2 text-[12px] border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-r-[1px] border-solid">
              {joinType?.description}
            </div>
          </div>
        </div>

        <Divider className="m-0 mb-3" />

        <Form.List name={[nameJoin, "on"]}>
          {(fieldsOn, { add: addOn, remove: removeOn }) => {
            return (
              <div>
                <div className="flex items-center justify-between mb-2 text-[16px]">
                  <div>Join conditions</div>
                  {!isCross && (
                    <div className="text-right">
                      <Button
                        size="small"
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={async () => {
                          addOn({
                            type: "eq",
                            args: ["", ""],
                          });
                        }}
                      >
                        Add condtion
                      </Button>
                    </div>
                  )}
                </div>
                <div className="text-[12px] mb-3">
                  Tell us how these tables are related. Add one or more fields from the tables to the left that match
                  the fields in the table to the right.
                </div>

                {isCross ? (
                  <Alert message="Cross joins don't require any conditions" type="info" showIcon />
                ) : (
                  <JoinCondition nameJoin={nameJoin} fieldsOn={fieldsOn} form={form} removeOn={removeOn} />
                )}
              </div>
            );
          }}
        </Form.List>
      </Modal>
    </>
  );
}

export default JoinConfigurationModal;
