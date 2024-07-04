import React, { useMemo, useState } from "react";
import { Card, Dropdown, Input, Tree } from "antd";
import type { TreeDataNode } from "antd";
import { DataNode } from "rc-tree/lib/interface";

const { Search } = Input;
type IProps = {
  title?: string;
};

const defaultData = [
  {
    title: "Firebase",
    key: "Firebase",
    children: [
      {
        title: "Firebase App Id",
        key: "Firebase App Id ",
      },
      {
        title: "App Info - Version",
        key: "App Info - Version",
      },
      {
        title: "Event Param - accumulated_earned - Count",
        key: "Event Param - accumulated_earned - Count",
      },
    ],
  },
  {
    title: "User Ab Testing",
    key: "User Ab Testing",
    children: [
      {
        title: "Abalyzer v2 ID",
        key: "Abalyzer v2 ID",
      },
    ],
  },
];

const flatternDataKeys: { key: React.Key; title: string }[] = [];
const generateList = (data: TreeDataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    flatternDataKeys.push({ key, title: key as string });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(defaultData);

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

const renderTitle = ({ dataSource, searchValue }: any) => {
  const loop = (data: DataNode[]): DataNode[] =>
    data.map((item) => {
      const strTitle = item.title as string;
      const index = strTitle.indexOf(searchValue);
      const beforeStr = strTitle.substring(0, index);
      const afterStr = strTitle.slice(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{strTitle}</span>
        );
      if (item.children) {
        return {
          title,
          key: item.key,
          children: loop(item.children),
        };
      }

      return {
        title,
        key: item.key,
      };
    });

  return loop(dataSource);
};

function TreeSelectBase({ title = "Default Title" }: IProps) {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const treeData = useMemo(() => {
    return renderTitle({
      dataSource: defaultData,
      searchValue,
    });
  }, [searchValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = flatternDataKeys
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  function onOpenChangeDropdown(open: boolean) {
    setOpenDropdown(open);
  }

  const items = [
    {
      key: "1",
      label: (
        <Tree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={treeData}
          onSelect={(selectedKeys, info) => {
            if (info.node.children) return;
            console.log("selected", selectedKeys, info);
            onOpenChangeDropdown(false);
          }}
        />
      ),
    },
  ];

  return (
    <Card
      size="small"
      title={title}
      className="h-full"
      extra={
        <>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            open={openDropdown}
            overlayStyle={{
              minWidth: 280,
            }}
          >
            <div className="flex items-center">
              <span className="mr-2">Add:</span>
              <Search
                placeholder="Search"
                onChange={onChange}
                onFocus={() => {
                  onOpenChangeDropdown(true);
                }}
              />
            </div>
          </Dropdown>
        </>
      }
    >
      dsds
    </Card>
  );
}

export default TreeSelectBase;
