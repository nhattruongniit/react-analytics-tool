import React from "react";
import Search from "antd/lib/input/Search";

// hooks
import { useTreeSelect } from "@src/hooks/use-tree-select";

// components
import TreeSelectBase from "./tree-select-base";

type IProps = {
  dataSource: any;
  checkedKeys: React.Key[];
  onCheckTree: (checkedKeys: React.Key[]) => void;
};

function TreeAvailable({ dataSource, onCheckTree, checkedKeys }: IProps) {
  const { onChange, expandedKeys, onExpand, debouncedValue, autoExpandParent } = useTreeSelect({
    dataSource,
  });

  return (
    <>
      <Search placeholder="Search members" className="mb-4" onChange={onChange} />
      <div className="max-h-[550px] overflow-auto">
        <TreeSelectBase
          checkable
          expandedKeys={expandedKeys}
          onExpand={onExpand}
          dataSource={dataSource}
          searchValue={debouncedValue}
          autoExpandParent={autoExpandParent}
          checkedKeys={checkedKeys}
          onCheck={(checkedKeys: any) => onCheckTree(checkedKeys as React.Key[])}
        />
      </div>
    </>
  );
}

export default TreeAvailable;
