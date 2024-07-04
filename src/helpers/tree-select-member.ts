import React from "react";
import { DataNode } from "antd/es/tree";
import { IAvailableMembers, ICubeNode } from "@src/types/query-builder";

export const getAllTreeKeys = (tree: DataNode[]) => {
  const result: string[] = [];
  tree.forEach((x) => {
    let childKeys: string[] = [];
    if (x.children) {
      childKeys = getAllTreeKeys(x.children);
    }

    result.push(...([x.key, ...childKeys] as string[]));
  });

  return result;
};

export const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
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

export function filteredSelectedMembers(tree: DataNode[], selectedKeys: React.Key[]) {
  return tree.reduce((filtered, node) => {
    if (selectedKeys.includes(node.key)) {
      const newNode = { ...node };
      if (newNode.children) {
        newNode.children = filteredSelectedMembers(newNode.children, selectedKeys);
      }
      filtered.push(newNode as never);
    } else if (node.children) {
      // Recursively filter children and include the parent if it has children left
      const filteredChildren = filteredSelectedMembers(node.children, selectedKeys);
      if (filteredChildren.length > 0) {
        const newNode = { ...node, children: filteredChildren };
        filtered.push(newNode as never);
      }
    }
    return filtered;
  }, []);
}

export function groupByCube(availableMembers: IAvailableMembers[]): ICubeNode[] {
  const allowedMembers = "firebase,user_on_boarding_survey,user_ab_testing,user_ua_info".split(",") || [];

  const memberOptions = availableMembers.filter((member) => {
    const cubeName = member.name.split(".")[0];

    return allowedMembers.includes(cubeName);
  });

  const result = [];
  const map = new Map();
  for (const item of memberOptions) {
    const [label] = item.name.split(".");
    if (!map.has(label)) {
      map.set(label, []);
    }
    map.get(label).push(item);
  }
  for (const [label, options] of map) {
    const title: string = label.split("_").join(" ") || "";
    const option: ICubeNode[] = options.map((item: any) => ({
      ...item,
      value: item.name,
      // label: item.title,
      label: item.shortTitle,
    }));

    result.push({ title, key: title, children: option });
  }
  return result;
}

export function groupCubeMemberToTreeNode(cubeTree: ICubeNode[]) {
  function processNode(node: ICubeNode) {
    const resultNode = {
      title: node.title ? (node.title as string).replace(/(^|\s)\S/g, (l) => l.toUpperCase()) : "",
      key: node.key,

      children: [],
    };

    const groupedChildren: any = {};

    (node.children || []).forEach((child: any) => {
      if (child.children) {
        // Recursively process child nodes
        resultNode.children.push(processNode(child) as never);
      } else if (child.meta && child.meta.member_groups) {
        child.meta.member_groups.forEach((group: any) => {
          if (!groupedChildren[group]) {
            groupedChildren[group] = {
              title: group,
              key: group,
              children: [],
            };
          }
          groupedChildren[group].children.push({
            title: child.label,
            key: child.value,
            public: Boolean(child.public),
          });
        });
      } else {
        resultNode.children.push({
          title: child.label,
          key: child.value,
          public: Boolean(child.public),
        } as never);
      }
    });

    for (const group in groupedChildren) {
      resultNode.children.push(groupedChildren[group] as never);
    }

    return resultNode;
  }

  return cubeTree.map(processNode);
}

export const mapMemberToTreeNode = (members: IAvailableMembers[]) => {
  const cubeOptions = groupByCube(members);
  const treeNode = groupCubeMemberToTreeNode(cubeOptions);
  return treeNode;
};

export function getKeyChildrenExceptParent(treeData: DataNode[]) {
  const keys: string[] = [];
  const generateKeys = (data: DataNode[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      if (node.children) {
        generateKeys(node.children);
      } else {
        keys.push(node.key as string);
      }
    }
  };
  generateKeys(treeData);
  return keys;
}
