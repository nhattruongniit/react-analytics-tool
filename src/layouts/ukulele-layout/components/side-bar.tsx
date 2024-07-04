import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import React from "react";
// refine
import { CanAccess, ITreeMenu, pickNotDeprecated, useMenu } from "@refinedev/core";

// antd core
import { Layout, Menu, Divider, Tag, Button, theme } from "antd";
import SubMenu from "antd/es/menu/SubMenu";

// antd icons
import { LeftOutlined, RightOutlined, UnorderedListOutlined } from "@ant-design/icons";

// assets
import ReactIcon from "@src/assets/images/react-icon.png";

const { Sider } = Layout;

type IProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

function SideBar({ collapsed, setCollapsed }: IProps) {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item: ITreeMenu) => {
      const { route, key, name, children, meta } = item;
      if (children.length > 0) {
        return (
          <CanAccess
            key={item.key}
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <SubMenu key={item.key} icon={meta?.icon ?? <UnorderedListOutlined />} title={name}>
              {renderTreeView(children, selectedKey)}
            </SubMenu>
          </CanAccess>
        );
      }
      const isSelected = key === selectedKey;
      const isRoute = !(
        pickNotDeprecated(meta?.parent, meta?.parent, meta?.parent) !== undefined && children.length === 0
      );

      return (
        <CanAccess
          key={item.key}
          resource={name.toLowerCase()}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Menu.Item key={item.key} icon={meta?.icon ?? (isRoute && <UnorderedListOutlined />)}>
            <Link to={route ?? ""} className="flex items-center">
              {name}
              {meta?.tags?.map((t: any, index: number) => {
                return (
                  <Tag key={index} color="gold" className="ml-2">
                    {t}
                  </Tag>
                );
              })}
            </Link>
            {!collapsed && isSelected && <div className="ant-menu-tree-arrow" />}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  const items = renderTreeView(menuItems, selectedKey);
  const isActiveMenuExperiment = selectedKey.includes("studio") || selectedKey.includes("experiment");

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={clsx(
        "max-w-[240px] h-[100vh] fixed top-0 left-0 bottom-0 border-0 border-r-[1px] border-solid border-[#E0E0E0] dark:border-[#2b2b2b] z-[999]",
        !collapsed && `w-[240px]`,
      )}
      style={{
        background: token.colorBgElevated,
      }}
    >
      <div
        className="flex items-center justify-center h-[64px] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={ReactIcon} alt="React" className="w-[35px]" />
        {!collapsed && <div className="mb-0 ml-4 text-[24px] font-bold dark:text-white">ADMIN</div>}
      </div>
      <Divider className="m-0 dark:border-[#1d1d1d]" />
      <Menu
        selectedKeys={isActiveMenuExperiment ? ["/Experiment ticket"] : [selectedKey]}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        style={{
          marginTop: "8px",
          border: "none",
        }}
        className="border-0 h-[calc(100vh-80px)] overflow-auto"
      >
        {items}
      </Menu>
      <Button
        type="text"
        style={{
          backgroundColor: token.colorBgElevated,
        }}
        className="absolute bottom-0 w-full h-[48px] rounded-none"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <RightOutlined
            style={{
              color: token.colorPrimary,
            }}
          />
        ) : (
          <LeftOutlined
            style={{
              color: token.colorPrimary,
            }}
          />
        )}
      </Button>
    </Sider>
  );
}

export default SideBar;
