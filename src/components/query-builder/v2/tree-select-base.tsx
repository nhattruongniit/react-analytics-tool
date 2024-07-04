import React from "react";
import { Tag, Tree, TreeDataNode, TreeProps } from "antd";
import { DataNode } from "rc-tree/lib/interface";
import { ICubeNode } from "@src/types/query-builder";

const renderTitle = ({ dataSource, searchValue }: any) => {
  const loop = (data: ICubeNode[]): DataNode[] =>
    data.map((item): any => {
      const strTitle = JSON.parse(JSON.stringify(item.title as string));
      const index = strTitle.toLowerCase().indexOf(searchValue.toLowerCase());
      const beforeStr = item.title.substring(0, index);
      const afterStr = item.title.slice(index + searchValue.length);

      let disabled = false;
      if (searchValue !== undefined && searchValue.length > 0 && index === -1) {
        disabled = true;
      }
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{item.title.substring(index, index + searchValue.length)}</span>
            {afterStr}
          </span>
        ) : (
          <span>{strTitle}</span>
        );
      if (item.children) {
        const children = loop(item.children);
        return {
          title,
          key: item.key,
          // disabled: children.filter((child) => !child.disabled).length === 0,
          // selectable: !disabled,
          // expanded: true,
          children: children,
          style: {
            display: children.filter((child) => !child.disabled).length === 0 ? "None" : null,
          },
        };
      }

      return {
        title,
        public: item.public,
        // selectable: isLeaf ? !disabled : disabled,
        // disabled: disabled,
        key: item.key,
        style: {
          display: disabled ? "None" : null,
        },
      };
    });

  return loop(dataSource);
};

type IProps = TreeProps & {
  dataSource: TreeDataNode[];
  searchValue: string;
};

function TreeSelectBase({ dataSource, searchValue, ...restTreeProps }: IProps) {
  const treeData = React.useMemo(() => {
    return renderTitle({
      dataSource,
      searchValue,
    });
  }, [dataSource, searchValue]);

  return (
    <Tree
      showLine
      treeData={treeData}
      titleRender={(node: any) => {
        return (
          <div className="flex items-center">
            {node.title}
            {!node.children && !node?.public && (
              <div className="shrink ml-2">
                <Tag color="gold">Test Mode</Tag>
              </div>
            )}
          </div>
        );
      }}
      // filterTreeNode={(input, treeNode) => {
      //   const match = true;

      //   if (match && !treeNode.isLeaf && !treeNode.children) {
      //     // Do some loading logic
      //   }

      //   return match;
      // }}
      {...restTreeProps}
    />
  );
}

export default TreeSelectBase;
