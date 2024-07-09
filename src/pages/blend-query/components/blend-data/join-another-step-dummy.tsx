import React from "react";

// config
import { DEFAULT_JOIN } from "@src/contexts/blender-context";

type IProps = {
  addJoin: (join: any) => void;
};

const JoinAnotherStepDummy = React.forwardRef(({ addJoin }: IProps, ref) => {
  React.useImperativeHandle(
    ref,
    () => {
      return {
        createJoin: () => {
          addJoin({
            ...DEFAULT_JOIN,
          });
        },
      };
    },
    [addJoin],
  );

  return null;
});

export default JoinAnotherStepDummy;
