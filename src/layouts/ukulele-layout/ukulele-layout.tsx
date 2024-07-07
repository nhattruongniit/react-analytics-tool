import React, { PropsWithChildren } from "react";

// antd
import { FloatButton, Layout, theme } from "antd";

// components
import HeaderBar from "./components/header-bar";
import SideBar from "./components/side-bar";

// context
import { useColorContext } from "@src/contexts/color-context";

const { Header, Content } = Layout;

const UkuleleLayout: React.FC<PropsWithChildren> = ({ children }) => {
  // states
  const [collapsed, setCollapsed] = React.useState(false);
  // hooks
  const { mode } = useColorContext();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout style={{ marginLeft: collapsed ? 80 : 240 }}>
          <Header
            className="p-0 flex items-center justify-between px-5"
            style={{
              background: mode === "light" ? `#0050B3` : colorBgContainer,
            }}
          >
            <HeaderBar />
          </Header>
          <Content
            style={{
              minHeight: 280,
              background: "#eeeef5",
            }}
            className="bg-[#eeeef5] relative dark:bg-black"
          >
            {children}
          </Content>
        </Layout>

        <FloatButton.BackTop />
      </Layout>
      <div>
        <FloatButton.BackTop />
      </div>
    </React.Fragment>
  );
};

export default UkuleleLayout;
