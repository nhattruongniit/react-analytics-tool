import React, { useState } from "react";
import { Button, Card, Modal, TreeDataNode } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// types
import { IMemberGroupBase } from "@src/types/query-builder";

// helpers
import { filteredSelectedMembers, getKeyChildrenExceptParent } from "@src/helpers/tree-select-member";

// components
import TreeAvailable from "./tree-available";
import TreeSelected from "./tree-selected";

type IProps = IMemberGroupBase &
  React.PropsWithChildren & {
    onOk: (keys: React.Key[], membersUnSelected: React.Key[]) => void;
    getDefaultCheckedKeys: any;
    isFetchingMeta?: boolean;
  };

function MemberGroupBase({
  title = "Default Title",
  dataSource,
  children,
  onOk,
  getDefaultCheckedKeys,
  isFetchingMeta,
}: IProps) {
  const keepKeysDefault = React.useRef<React.Key[]>([]); // using to reset checkedKeys when cancel modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<TreeDataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [membersUnSelected, setMembersUnSelected] = useState<React.Key[]>([]);

  function onCheckTree(keys: React.Key[]) {
    const membersUnSelected = keepKeysDefault.current.filter((key) => !keys.includes(key));
    const membersFiltered = filteredSelectedMembers(dataSource, keys);
    setSelectedMembers(membersFiltered);
    setCheckedKeys(keys);
    setMembersUnSelected(membersUnSelected);
  }

  React.useEffect(() => {
    const checkedKeys = getDefaultCheckedKeys;
    setCheckedKeys(checkedKeys);
    keepKeysDefault.current = checkedKeys;
  }, [getDefaultCheckedKeys]);

  function cancelModal() {
    setIsOpenModal(false);
    setCheckedKeys(keepKeysDefault.current); // reset checkedKeys
    const membersFiltered = filteredSelectedMembers(dataSource, keepKeysDefault.current); // reset selected members
    setSelectedMembers(membersFiltered);
  }

  function submitModal() {
    const membersFiltered = filteredSelectedMembers(dataSource, checkedKeys);
    const getAllChildrenSelected = getKeyChildrenExceptParent(membersFiltered);
    keepKeysDefault.current = getAllChildrenSelected;

    onOk(getAllChildrenSelected, membersUnSelected);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 100);
  }

  return (
    <>
      <Card
        size="small"
        title={title}
        className="h-full"
        extra={
          <Button
            size="small"
            type="dashed"
            className="border-gray-300 border-r-[1px] px-[8px]"
            loading={isFetchingMeta}
            onClick={() => setIsOpenModal(true)}
          >
            Add <PlusOutlined />
          </Button>
        }
      >
        {children}
      </Card>
      <Modal
        title={title}
        open={isOpenModal}
        width={850}
        className="modal-analytics"
        okText="Ok"
        onOk={submitModal}
        onCancel={cancelModal}
      >
        <div className="flex justify-between">
          <div className="w-1/2 shrink-0">
            <div className="font-bold mb-2">Available Members</div>
            <div className="max-h-[625px]">
              <div className="relative h-full border-solid border-[1px] border-[#d9d9d9] rounded-md p-3 mr-4">
                <TreeAvailable dataSource={dataSource} checkedKeys={checkedKeys} onCheckTree={onCheckTree} />
              </div>
            </div>
          </div>

          <div className="w-1/2 shrink-0">
            <div className="font-bold mb-2">Selected Members</div>
            <div className="max-h-[625px]">
              <div className="relative h-full border-solid border-[1px] border-[#d9d9d9] rounded-md p-3">
                <TreeSelected
                  dataSource={selectedMembers}
                  checkedKeys={checkedKeys.length > 0 ? checkedKeys : keepKeysDefault.current}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MemberGroupBase;
