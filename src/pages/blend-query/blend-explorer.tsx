import { theme } from "antd";

// components
import BlendStep from "./components/blend-step";
import JoinConfiguration from "./components/join-configuration";
import JoinAnotheStep from "./components/join-another-step";
import BlendResult from "./components/blend-result";

function BlendExplorer() {
  const { token } = theme.useToken();

  return (
    <div className="w-full h-full flex relative">
      <div className="block">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 opacity-50"
          style={{
            backgroundColor: token.colorBgMask,
          }}
        />
        <div
          className="absolute right-0 left-0 bottom-0 top-1/4 z-10 border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-t-[1px] border-solid"
          style={{
            backgroundColor: token.colorBgElevated,
          }}
        >
          <div className="flex items-center justify-between border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-solid p-2">
            <b>Blend Explorer</b>
          </div>
          <div className="flex h-[calc(100%-41px)]">
            <div className="flex items-start p-2 w-full overflow-auto">
              <BlendStep />

              <JoinConfiguration />

              <BlendStep />

              <JoinAnotheStep />
            </div>

            <div className="w-[320px] shrink-0 border-[#E0E0E0] border-[0px] border-l-[1px] dark:border-[#2b2b2b] border-solid">
              <BlendResult />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlendExplorer;
