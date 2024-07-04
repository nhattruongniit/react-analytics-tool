import { Spin } from "antd";

export const LoadingFullScreen = () => {
  return <Spin data-testid="loading" className="w-full h-screen flex flex-col justify-center items-center" />;
};
