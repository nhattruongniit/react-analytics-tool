import { Button, Input, Tooltip } from "antd";

function BlendResult() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="p-2 h-full overflow-auto">
        <div className="border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-b-[1px] border-solid mb-4">
          <div className="text-[12px]">
            <b>Data source name</b>
          </div>
          <div className="my-1">
            <Input className="p-0" placeholder="(Blended Data)" variant="borderless" />
          </div>
        </div>
        <div className="mb-3 text-[12px]">
          <div className="mb-1">
            <div className="font-bold mb-1">Included dimensions and metrics</div>
            <div className="flex items-center mb-1 text-[#000] bg-[#d9f7be] h-[22px]">
              <div className="shrink-0 border-0 border-solid border-r-[1px] border-white">
                <b className="px-1">123</b>
              </div>
              <Tooltip
                title={
                  <div className="text-[12px]">
                    firebase__event_timestamp_day <i>(Tony)</i>
                  </div>
                }
              >
                <div className="p-1 w-full truncate">
                  firebase__event_timestamp_day <i className="text-gray-500">(Tony)</i>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="border-[#E0E0E0] dark:border-[#2b2b2b] border-0 border-t-[1px] border-solid shrink-0">
        <div className="m-2">
          <Button type="primary" className="w-full">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlendResult;
