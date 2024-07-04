import React from "react";
import Search from "antd/lib/input/Search";

// hooks
import { useTreeSelect } from "@src/hooks/use-tree-select";

// helpers
import { filteredSelectedMembers } from "@src/helpers/tree-select-member";

// components
import TreeSelectBase from "./tree-select-base";

type IProps = {
  dataSource: any;
  checkedKeys: React.Key[];
};

function TreeSelected({ dataSource, checkedKeys }: IProps) {
  const membersFiltered = React.useMemo(
    () => filteredSelectedMembers(dataSource, checkedKeys),
    [dataSource, checkedKeys],
  );

  const { expandedKeys, onExpand, debouncedValue, onChange } = useTreeSelect({
    dataSource,
  });

  return (
    <>
      <Search
        disabled={membersFiltered.length === 0}
        placeholder="Search members"
        className="mb-4 hidden"
        onChange={onChange}
      />

      {membersFiltered.length > 0 ? (
        <div className="max-h-[550px] overflow-auto">
          <TreeSelectBase
            expandedKeys={expandedKeys}
            onExpand={onExpand}
            dataSource={membersFiltered}
            searchValue={debouncedValue}
          />
        </div>
      ) : (
        <div>No item!</div>
      )}
    </>
  );
}

export default TreeSelected;
