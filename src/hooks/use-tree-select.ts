import React, { useState } from "react";
import { TreeDataNode } from "antd";

// helpers
import { getAllTreeKeys } from "@src/helpers/tree-select-member";
import { useDebounce } from "./use-debounce";
import { sleep } from "@src/helpers/sleep";

const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return parentKey!;
};

type IProps = {
  dataSource: any;
};

export const useTreeSelect = ({ dataSource }: IProps) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const debouncedValue = useDebounce<string>(searchValue, 300);

  const flatternDataKeys = React.useMemo(() => {
    const results: { key: React.Key; title: string }[] = [];
    const generateList = (data: TreeDataNode[]) => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key, title } = node;
        results.push({ key, title: title as string });
        if (node.children) {
          generateList(node.children);
        }
      }
    };
    generateList(dataSource);

    return results;
  }, [dataSource]);

  const expandedDefaultKeys = React.useMemo(() => {
    const allKeys = getAllTreeKeys(dataSource);
    return allKeys;
  }, [dataSource]);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);

    await sleep(500);
    const newExpandedKeys = flatternDataKeys
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, dataSource);
        }
        return null;
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(true);
  };

  return {
    onChange,
    onExpand,
    expandedKeys,
    searchValue,
    autoExpandParent,
    setAutoExpandParent,
    expandedDefaultKeys,
    debouncedValue,
  };
};
